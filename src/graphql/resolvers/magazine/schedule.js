const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  MagazineScheduleConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineSchedule: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('magazine', 'Schedule', id);
    },
  },
};
