const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../../utils/format-graph-status');

const { isArray } = Array;

const isPopulated = value => isArray(value) && value.length;

const setTypes = (types) => {
  if (types.length > 1) return { $in: types };
  return types[0];
};

class ContentQueryAllDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input }, { base4 }) => {
      const { types, publishedOnly } = this.args;

      const args = {};
      let criteria = {};

      if (publishedOnly) {
        criteria.status = 1;
      }

      let date = new Date();
      if (input) {
        const {
          pagination,
          sort,
          since,
          status,
        } = input;
        if (!publishedOnly && status) criteria = { ...criteria, ...formatStatus(status) };
        if (isPopulated(input.types)) criteria.type = setTypes(input.types);
        args.pagination = pagination;
        args.sort = sort;
        if (since) date = since;
      }
      // Allow the directive argument to override the input.
      if (isPopulated(types)) criteria.type = setTypes(types);

      if (publishedOnly) {
        // Handle published/unpublished date.
        criteria.published = { $lte: date };
        criteria.$or = [
          { unpublished: { $gte: date } },
          { unpublished: { $exists: false } },
        ];
      }

      args.criteria = criteria;
      return base4.find('platform.Content', args);
    };
  }
}

module.exports = ContentQueryAllDirective;
