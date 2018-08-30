const scheduleResolvers = require('../platform/schedule/common');

module.exports = {
  /**
   *
   */
  EmailSchedule: {
    ...scheduleResolvers,
    product: (schedule, _, { base4 }) => base4.reference('platform', 'Product', schedule.product, { type: 'Newsletter' }),
    section: (schedule, _, { base4 }) => base4.reference('email', 'Section', schedule.section),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    emailSchedule: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('email', 'Schedule', id);
    },
  },
};
