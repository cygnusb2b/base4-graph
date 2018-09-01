const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  WebsiteSectionConnection: paginationResolvers,

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
