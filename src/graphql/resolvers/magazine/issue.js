module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineIssue: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('magazine', 'Issue', id);
    },
  },
};
