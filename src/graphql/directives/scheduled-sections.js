const { SchemaDirectiveVisitor } = require('graphql-tools');

class ScheduledSectionsDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = async ({ _id }, { input: { pagination, sort } }, { base4 }) => {
      const coll = await base4.collection('website', 'Schedule');
      const ids = await coll.distinct('section', { 'content.$id': _id });
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
