const productResolvers = require('../platform/product/common');

module.exports = {
  /**
   *
   */
  EmailProductNewsletter: {
    ...productResolvers,
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    emailProductNewsletter: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform.Product', id, { type: 'Newsletter' });
    },
  },
};
