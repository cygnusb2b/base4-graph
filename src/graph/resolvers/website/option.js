const coreResolvers = require('../core');

module.exports = {
  /**
   *
   */
  WebsiteOption: {
    ...coreResolvers,
    site: (option, _, { base4 }) => base4.reference('platform', 'Product', option.site, { type: 'Site' }),
  },
};
