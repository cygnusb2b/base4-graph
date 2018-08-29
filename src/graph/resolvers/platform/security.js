const { ObjectID } = require('mongodb');

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
      return base4.strictFindById('platform', 'User', ObjectID(id));
    },
  },

  /**
   *
   */
  PlatformSecurityUser: {
    id: doc => doc._id,
  },
};
