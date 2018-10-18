const { SchemaDirectiveVisitor } = require('graphql-tools');
const { createTitle, createDescription } = require('../../utils/content');

class ContentMetadataDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, _, { base4 }) => ({
      title: await createTitle(doc, base4),
      description: createDescription(doc),
    });
  }
}

module.exports = ContentMetadataDirective;
