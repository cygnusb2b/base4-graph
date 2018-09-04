const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../../utils/format-graph-status');

const { isArray } = Array;

class ContentQueryAllDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input }, { base4 }) => {
      const { type } = this.args;
      const args = { criteria: {} };

      if (input) {
        const {
          types,
          status,
          pagination,
          sort,
        } = input;
        if (status) args.criteria = { ...args.criteria, ...formatStatus(status) };
        // if (input.type) args.criteria.type = input.type;
        if (isArray(types) && types.length) args.criteria.type = { $in: types };
        args.pagination = pagination;
        args.sort = sort;
      }
      // Allow the directive argument to override the input.
      if (type) args.criteria.type = type;

      return base4.find('platform.Content', args);
    };
  }
}

module.exports = ContentQueryAllDirective;
