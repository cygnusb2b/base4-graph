const { SchemaDirectiveVisitor } = require('graphql-tools');
const { createTitle, createDescription } = require('../../utils/website-section');

class SectionMetadataDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = doc => ({
      title: createTitle(doc),
      description: createDescription(doc),
    });
  }
}

module.exports = SectionMetadataDirective;
