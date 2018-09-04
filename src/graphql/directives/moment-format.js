const { SchemaDirectiveVisitor } = require('graphql-tools');
const moment = require('moment-timezone');
const objectPath = require('object-path');

class MomentFormatDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }) => {
      const { localField, defaultFormat } = this.args;
      const value = objectPath.get(doc, localField || field.name);
      console.info(value, value instanceof Date);
      if (!(value instanceof Date)) return value;

      const format = input && input.format ? input.format : defaultFormat;
      // Force server-side dates to CST/CDT as done within the Base4 PHP backend.
      return moment(value).tz('America/Chicago').format(format);
    };
  }
}

module.exports = MomentFormatDirective;
