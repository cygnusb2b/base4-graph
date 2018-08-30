module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    platformTaxonomy: async (root, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform', 'Taxonomy', id);
    },
  },

  /**
   *
   */
  PlatformTaxonomy: {
    /**
     *
     */
    id: doc => doc._id,

    /**
     *
     */
    parent: async (doc, _, { base4 }) => base4.reference('platform', 'Taxonomy', doc.parent),

    /**
     *
     */
    children: async (doc, args, { base4 }) => base4.inverse('platform', 'Taxonomy', 'parent.$id', doc._id),
  },
};
