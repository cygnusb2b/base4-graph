const { SchemaDirectiveVisitor } = require('graphql-tools');
const { extractMutationValue } = require('../../base4');

class MutateDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { type, localField } = this.args;
      return extractMutationValue(doc, type, localField || field.name);
    };
  }
}

module.exports = MutateDirective;
