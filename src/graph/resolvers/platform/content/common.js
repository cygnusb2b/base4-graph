const { extractMutationValue } = require('../../../../base4');

module.exports = {
  id: doc => doc._id,
  alias: doc => extractMutationValue(doc, 'Website', 'alias'),
  slug: doc => extractMutationValue(doc, 'Website', 'slug'),
  seoTitle: doc => extractMutationValue(doc, 'Website', 'seoTitle') || doc.name,
  redirects: doc => extractMutationValue(doc, 'Website', 'redirects') || [],
};
