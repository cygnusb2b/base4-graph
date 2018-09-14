module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    platformSecurityUser: async (root, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform.User', id);
    },
  },
};
