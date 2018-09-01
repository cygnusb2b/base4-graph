const { extractMutationValue } = require('../../../../base4');

module.exports = {
  primaryImage: (doc, _, { base4 }) => base4.reference('platform', 'Asset', doc.primaryImage),
  taxonomy: (doc, _, { base4 }) => base4.references('platform', 'Taxonomy', doc.taxonomy),
};
