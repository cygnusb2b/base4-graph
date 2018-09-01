const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  EmailScheduleConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    emailSchedule: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('email', 'Schedule', id);
    },
  },
};
