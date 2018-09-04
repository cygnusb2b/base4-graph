module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    platformAssetImage: async (root, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform', 'Asset', id, { type: 'Image' });
    },
  },
};
