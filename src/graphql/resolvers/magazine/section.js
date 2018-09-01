module.exports = {
  /**
   *
   */
  MagazineSection: {
    publication: (section, _, { base4 }) => base4.reference('platform', 'Product', section.publication, { type: 'Publication' }),
    issue: (section, _, { base4 }) => base4.reference('magazine', 'Issue', section.issue),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineSection: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('magazine', 'Section', id);
    },
  },
};
