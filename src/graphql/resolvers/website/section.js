const { ObjectID } = require('mongodb');
const paginationResolvers = require('../../../pagination/resolvers');
const formatStatus = require('../../../utils/format-graph-status');

module.exports = {
  /**
   *
   */
  WebsiteSectionConnection: paginationResolvers,

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('website', 'Section', id);
    },

    /**
     *
     */
    websiteSections: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const {
        status,
        parentId,
        siteId,
        sort,
        pagination,
      } = input;

      const criteria = { ...formatStatus(status) };
      if (parentId === 0) {
        criteria['parent.$id'] = { $exists: false };
      } else if (parentId) {
        criteria['parent.$id'] = parentId;
      }
      if (siteId) criteria['site.$id'] = new ObjectID(siteId);
      return base4.paginate('website.Section', { pagination, sort, criteria });
    },
  },
};
