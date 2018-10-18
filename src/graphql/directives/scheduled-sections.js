const { SchemaDirectiveVisitor } = require('graphql-tools');

class ScheduledSectionsDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = async ({ _id }, { input: { pagination, sort } }, { base4 }) => {
      const ids = await base4.distinct('website.Schedule', 'section', { 'content.$id': _id });
      const criteria = { _id: { $in: ids } };
      return base4.find('website.Section', {
        pagination,
        sort,
        criteria,
      });
    };
  }
}

module.exports = ScheduledSectionsDirective;
