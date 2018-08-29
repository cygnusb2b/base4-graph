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
      const { id } = input;
      return base4.strictFindById('website', 'Section', id);
    },
  },

  /**
   *
   */
  WebsiteSection: {
    /**
     *
     */
    id: doc => doc._id,

    /**
     *
     */
    parent: (doc, _, { base4 }) => base4.reference('website', 'Section', doc.parent),

    /**
     *
     */
    children: async (doc, _, { base4 }) => base4.inverse('website', 'Section', 'parent.$id', doc._id),
  },
};
