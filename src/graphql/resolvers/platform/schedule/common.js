const coreResolvers = require('../../core');

module.exports = {
  ...coreResolvers,
  content: (doc, _, { base4 }) => base4.reference('platform', 'Content', doc.content),
};
