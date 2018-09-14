const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');
const inflection = require('inflection');

const { underscore, dasherize } = inflection;

class InflectDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }) => {
      const { localField } = this.args;
      const value = objectPath.get(doc, localField || field.name);

      if (!input) return value;
      const { format } = input;

      switch (format) {
        case 'dasherize':
          return dasherize(underscore(value));
        default:
          return value;
      }
    };
  }
}

module.exports = InflectDirective;
