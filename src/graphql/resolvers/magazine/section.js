const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  MagazineSectionConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('magazine', 'Section', id);
    },
  },
};
