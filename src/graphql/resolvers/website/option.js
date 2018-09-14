const { ObjectID } = require('mongodb');
const formatStatus = require('../../../utils/format-graph-status');

module.exports = {
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
      return base4.strictFindById('website.Option', id);
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
