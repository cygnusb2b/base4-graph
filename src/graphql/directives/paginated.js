const { SchemaDirectiveVisitor } = require('graphql-tools');
const resolvers = require('../../pagination/resolvers');

class PaginatedDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitObject(type) { // eslint-disable-line class-methods-use-this
    const fields = type.getFields();
    Object.keys(fields).forEach((name) => {
      const field = fields[name];
      field.resolve = resolvers[name];
    });
  }
}

module.exports = PaginatedDirective;
