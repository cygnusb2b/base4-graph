const coreResolvers = require('../core');

const deploymentTypes = [
  'Newsletter',
  'ThirdParty',
];

module.exports = {
  /**
   *
   */
  EmailSection: {
    ...coreResolvers,
    deployment: (section, _, { base4 }) => base4.reference('platform', 'Product', section.deployment, { type: { $in: deploymentTypes } }),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    emailSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('email', 'Section', id);
    },
  },
};
