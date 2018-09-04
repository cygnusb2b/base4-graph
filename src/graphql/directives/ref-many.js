const { SchemaDirectiveVisitor } = require('graphql-tools');
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

      const args = {
        doc,
        foreignField,
        relatedModel: model,
        localField: localField || field.name,
        criteria: { ...criteria },
      };

      if (input) {
        const { status } = input;
        if (status) args.criteria = { ...args.criteria, ...formatStatus(status) };
        const { pagination, sort } = input;
        args.pagination = pagination;
        args.sort = sort;
      }
      return base4.referenceMany(args);
    };
  }
}

module.exports = RefManyDirective;
