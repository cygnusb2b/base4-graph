const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../../utils/format-graph-status');

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
      if (type) args.criteria.type = type;

      if (input) {
        const { status, pagination, sort } = input;
        if (status) args.criteria = { ...args.criteria, ...formatStatus(status) };
        if (input.type) args.criteria.type = input.type;
        args.pagination = pagination;
        args.sort = sort;
      }
      return base4.find('platform.Content', args);
    };
  }
}

module.exports = ContentQueryAllDirective;
