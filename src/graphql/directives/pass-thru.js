const { SchemaDirectiveVisitor } = require('graphql-tools');

class PassThruDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = doc => doc;
  }
}

module.exports = PassThruDirective;
