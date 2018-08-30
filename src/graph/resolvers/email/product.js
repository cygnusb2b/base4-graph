const productResolvers = require('../platform/product/common');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  EmailProductDeployment: {
    /**
     *
     * @param {object} obj
     */
    __resolveType(obj) {
      if (obj.type === 'Newsletter') return 'EmailProductNewsletter';
      if (obj.type === 'ThirdParty') return 'EmailProductThirdParty';
      return null;
    },
  },

  /**
   *
   */
  EmailProductNewsletter: {
    ...productResolvers,
    defaultTesters: ({ defaultTesters }) => (isArray(defaultTesters) ? defaultTesters : []),
    parent: (deployment, _, { base4 }) => base4.reference('platform', 'Product', deployment.parent, { type: 'Newsletter' }),
    sections: (deployment, _, { base4 }) => base4.inverse('email', 'Section', 'deployment.$id', deployment._id),
  },

  /**
   *
   */
  EmailProductThirdParty: {
    ...productResolvers,
    defaultTesters: ({ defaultTesters }) => (isArray(defaultTesters) ? defaultTesters : []),
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
      return base4.strictFindById('platform', 'Product', id, { type: 'Newsletter' });
    },
  },
};
