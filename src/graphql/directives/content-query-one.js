const { SchemaDirectiveVisitor } = require('graphql-tools');

class ContentQueryOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input }, { base4 }) => {
      const { type } = this.args;
      const { id } = input;

      return base4.strictFindById('platform', 'Content', id, { type });
    };
  }
}

module.exports = ContentQueryOneDirective;
