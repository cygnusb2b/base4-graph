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
      const criteria = {};
      if (type) {
        criteria.type = type;
      } else if (input.type) {
        criteria.type = input.type;
      }

      return base4.findById('platform.Content', id, criteria);
    };
  }
}

module.exports = ContentQueryOneDirective;
