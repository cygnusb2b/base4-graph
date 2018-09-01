const { extractMutationValue } = require('../../../base4');
const paginationResolvers = require('../../../pagination/resolvers');

module.exports = {
  /**
   *
   */
  PlatformAssetImageConnection: paginationResolvers,

  /**
   *
   */
  PlatformAssetImage: {
    approvedWeb: doc => extractMutationValue(doc, 'Website', 'approved'),
    approvedMagazine: doc => extractMutationValue(doc, 'Magazine', 'approved'),
  },

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
