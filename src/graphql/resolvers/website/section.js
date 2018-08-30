const coreResolvers = require('../core');
const formatSort = require('../../../utils/convert-graph-sort');
const formatStatus = require('../../../utils/format-graph-status');

const { isArray } = Array;

module.exports = {
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
    parent: ({ parent }, { input }, { base4 }) => {
      const { status } = input;
      return base4.referenceOne({
        model: 'website.Section',
        ref: parent,
        criteria: { ...formatStatus(status) },
      });
    },

    /**
     *
     */
    children: ({ _id }, { input }, { base4 }) => {
      const { sort, status, pagination } = input;
      const { first } = pagination;
      return base4.inverseMany({
        model: 'website.Section',
        field: 'parent.$id',
        id: _id,
        criteria: { ...formatStatus(status) },
        sort: formatSort(sort),
        first,
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
