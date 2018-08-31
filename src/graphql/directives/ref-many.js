const { SchemaDirectiveVisitor } = require('graphql-tools');
const Base4 = require('../../base4');
const Pagination = require('../../pagination');
const formatStatus = require('../../utils/format-graph-status');

class RefManyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { base4 }) => {
      const {
        model,
        localField,
        foreignField,
        criteria,
      } = this.args;

      const refs = localField === '_id' ? [doc._id] : doc[localField || field.name];
      const ids = Base4.extractRefIds(refs);
      if (!ids) return [];

      let query = {
        ...criteria,
        [foreignField]: { $in: ids },
      };

      const { namespace, resource } = Base4.parseModelName(model);
      const collection = await base4.collection(namespace, resource);

      if (input) {
        const {
          status,
          pagination,
          sort,
        } = input;
        if (status) query = { ...query, ...formatStatus(status) };
        if (pagination) {
          const { first, after } = pagination;
          return new Pagination(collection, {
            sort,
            pagination: { first, after: Base4.coerceID(after) },
            criteria: query,
          });
        }
        if (sort) return collection.find(query).sort(sort);
      }
      return collection.find(query);
    };
  }
}

module.exports = RefManyDirective;
