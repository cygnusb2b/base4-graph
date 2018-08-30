const coreResolvers = require('../core');

module.exports = {
  /**
   *
   */
  WebsiteOption: {
    ...coreResolvers,
    site: (option, _, { base4 }) => base4.reference('platform', 'Product', option.site, { type: 'Site' }),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteOption: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('website', 'Option', id);
    },
  },
};
