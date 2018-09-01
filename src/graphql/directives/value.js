const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');

class ValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { localField } = this.args;
      return objectPath.get(doc, localField || field.name);
    };
  }
}

module.exports = ValueDirective;
