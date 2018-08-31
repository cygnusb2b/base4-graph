const coreResolvers = require('../core');
const paginationResolvers = require('../../../pagination/resolvers');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  WebsiteSectionConnection: paginationResolvers,

  /**
   *
   */
  WebsiteSection: {
    /**
     *
     */
    ...coreResolvers,

    /**
     *
     */
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
