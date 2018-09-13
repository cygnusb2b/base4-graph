const { ObjectID } = require('mongodb');
const Base4 = require('../../../base4');
const formatStatus = require('../../../utils/format-graph-status');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id, status } = input;
      const criteria = { _id: Base4.coerceID(id), ...formatStatus(status) };
      return base4.strictFindOne('website.Section', { criteria });
    },

    /**
     *
     */
    websiteSectionAlias: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { alias, status } = input;
      const criteria = { alias, ...formatStatus(status) };
      return base4.strictFindOne('website.Section', { criteria });
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
