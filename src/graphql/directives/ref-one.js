const { SchemaDirectiveVisitor } = require('graphql-tools');
const formatStatus = require('../../utils/format-graph-status');

class RefOneDirective extends SchemaDirectiveVisitor {
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

      let query = { ...criteria };
      if (input) {
        const { status } = input;
        if (status) query = { ...query, ...formatStatus(status) };
      }
      return base4.referenceOne({
        doc,
        foreignField,
        relatedModel: model,
        localField: localField || field.name,
        criteria: query,
      });
    };
  }
}

module.exports = RefOneDirective;
