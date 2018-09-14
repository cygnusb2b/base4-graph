const productResolvers = require('../platform/product/common');

module.exports = {
  /**
   *
   */
  MagazineProductPublication: {
    ...productResolvers,
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineProductPublication: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform.Product', id, { type: 'Publication' });
    },
  },
};
