module.exports = {
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
