const scheduleResolvers = require('../platform/schedule/common');

module.exports = {
  /**
   *
   */
  WebsiteSchedule: {
    ...scheduleResolvers,
    product: (doc, _, { base4 }) => base4.reference('platform', 'Product', doc.product, { type: 'Site' }),
    section: (doc, _, { base4 }) => base4.reference('website', 'Section', doc.section),
    option: (doc, _, { base4 }) => base4.reference('website', 'Option', doc.option),
    categories: (doc, _, { base4 }) => base4.references('platform', 'Taxonomy', doc.categories, { type: 'Category' }),
    primarySection: (doc, _, { base4 }) => base4.reference('website', 'Section', doc.primarySection),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSchedule: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('website', 'Schedule', id);
    },
  },
};
