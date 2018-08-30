const coreResolvers = require('../core');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  WebsiteSection: {
    ...coreResolvers,
    site: (section, _, { base4 }) => base4.reference('platform', 'Product', section.site, { type: 'Site' }),
    parent: (section, _, { base4 }) => base4.reference('website', 'Section', section.parent),
    children: (section, _, { base4 }) => base4.inverse('website', 'Section', 'parent.$id', section._id),
    logo: (section, _, { base4 }) => base4.reference('platform', 'Asset', section.logo, { type: 'Image' }),
    redirects: ({ redirects }) => (isArray(redirects) ? redirects : []),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('website', 'Section', id);
    },
  },
};
