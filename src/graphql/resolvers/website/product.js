const productResolvers = require('../platform/product/common');
const formatStatus = require('../../../utils/format-graph-status');

module.exports = {
  /**
   *
   */
  WebsiteProductSite: {
    ...productResolvers,
    rootSections: (doc, { input }, { base4 }) => {
      const { status, pagination, sort } = input;
      return base4.referenceMany({
        doc,
        relatedModel: 'website.Section',
        localField: '_id',
        foreignField: 'site.$id',
        criteria: { parent: { $exists: false }, ...formatStatus(status) },
        pagination,
        sort,
      });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteProductSite: (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform.Product', id, { type: 'Site' });
    },

    /**
     *
     */
    websiteProductSites: (_, { input }, { auth, base4 }) => {
      auth.check();
      const { status, sort, pagination } = input;
      const criteria = { type: 'Site', ...formatStatus(status) };
      return base4.paginate('platform.Product', { pagination, sort, criteria });
    },
  },
};
