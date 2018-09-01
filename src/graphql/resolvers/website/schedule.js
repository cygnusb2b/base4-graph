module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSchedule: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('website', 'Schedule', id);
    },
  },
};
