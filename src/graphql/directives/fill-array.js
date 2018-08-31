const { SchemaDirectiveVisitor } = require('graphql-tools');

const { isArray } = Array;

class FillArrayDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { localField } = this.args;
      const value = doc[localField];
      return isArray(value) ? value : [];
    };
  }
}

module.exports = FillArrayDirective;
