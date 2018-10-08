const { SchemaDirectiveVisitor } = require('graphql-tools');

class ContentHashDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  static visitFieldDefinition(field) {
    const key = 'platform.Content';
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input }, { base4 }) => base4.findOne(key, { criteria: input });
  }
}

module.exports = ContentHashDirective;
