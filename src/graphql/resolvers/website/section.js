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
    site: ({ site }, _, { base4 }) => base4.referenceOne({
      model: 'platform.Product',
      ref: site,
      criteria: { type: 'Site' },
    }),

    /**
     *
     */
    parent: ({ parent }, _, { base4 }) => base4.referenceOne({ model: 'website.Section', ref: parent }),

    /**
     *
     */
    children: ({ _id }, { input }, { base4 }) => {
      const { sort, status } = input;
      return base4.inverseMany({
        model: 'website.Section',
        field: 'parent.$id',
        id: _id,
        criteria: { ...formatStatus(status) },
        sort: formatSort(sort),
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
