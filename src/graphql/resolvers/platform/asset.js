const { extractMutationValue } = require('../../../base4');

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

  /**
   *
   */
  PlatformAssetImage: {
    id: doc => doc._id,
    approvedWeb: doc => extractMutationValue(doc, 'Website', 'approved'),
    approvedMagazine: doc => extractMutationValue(doc, 'Magazine', 'approved'),
  },
};
