const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  PlatformTaxonomyConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    platformTaxonomy: async (root, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform', 'Taxonomy', id);
    },
  },
};
