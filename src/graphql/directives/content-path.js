const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');
const inflection = require('inflection');

const { underscore, dasherize } = inflection;

const resolvers = {
  id: doc => doc._id,
  slug: doc => objectPath.get(doc, 'mutations.Website.slug'),
  type: doc => dasherize(underscore(doc.type)),
  sectionAlias: async (doc, { base4 }) => {
    const section = await base4.referenceOne({
      doc,
      relatedModel: 'website.Section',
      localField: 'mutations.Website.primarySection',
      foreignField: '_id',
      projection: { alias: 1 },
    });
    return section ? section.alias : null;
  },
};

class ContentPathDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, ctx) => {
      const { fields } = input;

      const { type, linkUrl } = doc;
      const types = ['Promotion', 'TextAd'];
      if (types.includes(type) && linkUrl) return linkUrl;

      const values = await Promise.all(fields.map((key) => {
        const fn = resolvers[key];
        return typeof fn === 'function' ? fn(doc, ctx) : doc[key];
      }));

      const path = values.filter(v => v).join('/');
      if (!path) return '';
      return `/${path}`;
    };
  }
}

module.exports = ContentPathDirective;
