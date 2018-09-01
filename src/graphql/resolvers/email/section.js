const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  EmailSectionConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    emailSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('email', 'Section', id);
    },
  },
};
