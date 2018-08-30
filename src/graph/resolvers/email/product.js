const productResolvers = require('../platform/product/common');

const { isArray } = Array;

module.exports = {
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
