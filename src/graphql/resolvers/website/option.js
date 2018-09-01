const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  WebsiteOptionConnection: paginationResolvers,

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
