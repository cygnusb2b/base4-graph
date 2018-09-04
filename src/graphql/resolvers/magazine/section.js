module.exports = {
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
