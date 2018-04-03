const { getUser } = require('../../utils');

module.exports = {
  /**
   *
   */
  Contact: {
    /**
     *
     */
    id: doc => doc._id,
    bio: doc => doc.body,

    /**
     *
     */
    createdBy: (contact, args, { tenant }) => getUser(tenant, contact.createdBy),

    /**
     *
     */
    updatedBy: (contact, args, { tenant }) => getUser(tenant, contact.updatedBy),
  },
};
