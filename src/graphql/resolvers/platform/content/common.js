const { extractMutationValue } = require('../../../../base4');

module.exports = {
  primaryImage: (doc, _, { base4 }) => base4.reference('platform', 'Asset', doc.primaryImage),
  taxonomy: (doc, _, { base4 }) => base4.references('platform', 'Taxonomy', doc.taxonomy),
  primarySite: async (doc, _, { base4 }) => {
    const primarySite = extractMutationValue(doc, 'Website', 'primarySite');
    return base4.reference('platform', 'Product', primarySite, { type: 'Site' });
  },
  primarySection: (doc, _, { base4 }) => {
    const primarySection = extractMutationValue(doc, 'Website', 'primarySection');
    return base4.reference('website', 'Section', primarySection);
  },
  createdBy: (doc, _, { base4 }) => base4.reference('platform', 'User', doc.createdBy),
  updatedBy: (doc, _, { base4 }) => base4.reference('platform', 'User', doc.updatedBy),
};
