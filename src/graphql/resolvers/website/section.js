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
