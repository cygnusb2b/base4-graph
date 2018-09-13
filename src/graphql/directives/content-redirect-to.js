const { SchemaDirectiveVisitor } = require('graphql-tools');

class ContentRedirectToDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) { // eslint-disable-line class-methods-use-this
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { type, linkUrl } = doc;
      const types = ['Promotion', 'TextAd'];
      if (!types.includes(type)) return null;

      return linkUrl;
    };
  }
}

module.exports = ContentRedirectToDirective;
