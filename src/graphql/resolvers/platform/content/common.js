module.exports = {
  taxonomy: (doc, _, { base4 }) => base4.references('platform', 'Taxonomy', doc.taxonomy),
};
