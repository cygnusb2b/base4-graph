const coreResolvers = require('../core');
const paginationResolvers = require('../../../pagination/resolvers');
const formatStatus = require('../../../utils/format-graph-status');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  WebsiteSectionConnection: paginationResolvers,

  /**
   *
   */
  WebsiteSection: {
    /**
     *
     */
    ...coreResolvers,

    /**
     *
     */
    site: ({ site }, { input }, { base4 }) => {
      const { status } = input;
      return base4.referenceOne({
        model: 'platform.Product',
        ref: site,
        criteria: { ...formatStatus(status), type: 'Site' },
      });
    },

    /**
     *
     */
    children: ({ _id }, { input }, { base4 }) => {
      const { sort, status, pagination } = input;
      return base4.inverseMany({
        model: 'website.Section',
        field: 'parent.$id',
        id: _id,
        criteria: { ...formatStatus(status) },
        sort,
        pagination,
      });
    },

    /**
     *
     */
    logo: ({ logo }, _, { base4 }) => base4.referenceOne({
      model: 'platform.Asset',
      ref: logo,
      criteria: { type: 'Image' },
    }),

    /**
     *
     */
    redirects: ({ redirects }) => (isArray(redirects) ? redirects : []),
  },

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
  },
};
