const { SchemaDirectiveVisitor } = require('graphql-tools');
const { UserInputError } = require('apollo-server-express');
const objectPath = require('object-path');
const Base4 = require('../../base4');

class RelatedContentDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { base4 }) => {
      const { type } = this.args;
      const {
        includeContentTypes,
        excludeContentTypes,
        requiresImage,
        pagination,
        sort,
      } = input;

      const now = new Date();
      const criteria = {
        status: 1,
        published: { $lte: now },
        $and: [
          {
            $or: [
              { unpublished: { $gt: now } },
              { unpublished: { $exists: false } },
            ],
          },
        ],
      };

      const sectionId = Base4.extractRefId(objectPath.get(doc, 'mutations.Website.primarySection'));
      const relatedToIds = Base4.extractRefIds(doc.relatedTo);

      switch (type) {
        case 'owned':
          criteria._id = { $in: relatedToIds };
          break;
        case 'inverse':
          criteria['relatedTo.$id'] = doc._id;
          break;
        case 'combined':
          criteria.$or = [
            { _id: { $in: relatedToIds } },
            { 'relatedTo.$id': doc._id },
          ];
          break;
        case 'primarySection':
          criteria['mutations.Website.primarySection.$id'] = sectionId;
          break;
        case 'company':
          criteria.$or = [
            { company: doc._id },
            { 'relatedTo.$id': doc._id },
          ];
          break;
        default:
          throw new UserInputError(`No related content handler found for type '${type}'`);
      }

      if (includeContentTypes.length) {
        criteria.$and.push({ type: { $in: includeContentTypes } });
      }
      if (excludeContentTypes.length) {
        criteria.$and.push({ type: { $nin: excludeContentTypes } });
      }
      if (requiresImage) {
        criteria.primaryImage = { $exists: true };
      }

      return base4.find('platform.Content', {
        pagination,
        sort,
        criteria,
      });
    };
  }
}

module.exports = RelatedContentDirective;
