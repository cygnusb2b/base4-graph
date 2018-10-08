const { SchemaDirectiveVisitor } = require('graphql-tools');

class ContentHashDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input: { hash } }, { base4 }) => {
      const key = 'platform.Content';
      return base4.findOne(key, { criteria: { hash } });
    };
  }
}

module.exports = ContentHashDirective;
