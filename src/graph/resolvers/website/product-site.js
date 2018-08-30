const productResolvers = require('../platform/product/common');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  WebsiteProductSite: {
    ...productResolvers,
    sections: (site, _, { base4 }) => base4.inverse('website', 'Section', 'site.$id', site._id),
    rootSections: (site, _, { base4 }) => base4.inverse('website', 'Section', 'site.$id', site._id, { parent: { $exists: false } }),
    options: (site, _, { base4 }) => base4.inverse('website', 'Option', 'site.$id', site._id),
    socialFollow: (site) => {
      const { socialFollow } = site;
      return isArray(socialFollow) ? socialFollow : [];
    },
    redirects: (site) => {
      const { redirects } = site;
      return isArray(redirects) ? redirects : [];
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteProductSite: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform', 'Product', id, { type: 'Site' });
    },
  },
};
