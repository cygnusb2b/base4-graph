const { ObjectID } = require('mongodb');
const paginationResolvers = require('../../../pagination/resolvers');
const formatStatus = require('../../../utils/format-graph-status');

module.exports = {
  /**
   *
   */
  WebsiteOptionConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteOption: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('website', 'Option', id);
    },

    /**
     *
     */
    websiteOptions: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const {
        status,
        siteId,
        sort,
        pagination,
      } = input;

      const criteria = { ...formatStatus(status) };
      if (siteId) criteria['site.$id'] = new ObjectID(siteId);
      return base4.paginate('website.Option', { pagination, sort, criteria });
    },
  },
};
