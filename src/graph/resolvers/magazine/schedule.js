const scheduleResolvers = require('../platform/schedule/common');

module.exports = {
  /**
   *
   */
  MagazineSchedule: {
    ...scheduleResolvers,
    product: (schedule, _, { base4 }) => base4.reference('platform', 'Product', schedule.product),
    section: (schedule, _, { base4 }) => base4.reference('magazine', 'Section', schedule.section),
    issue: (schedule, _, { base4 }) => base4.reference('magazine', 'Issue', schedule.issue),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineSchedule: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('magazine', 'Schedule', id);
    },
  },
};
