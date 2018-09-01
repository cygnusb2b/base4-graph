const { isArray } = Array;

module.exports = {
  /**
   *
   */
  MagazineIssue: {
    publication: (issue, _, { base4 }) => base4.reference('platform', 'Product', issue.publication, { type: 'Publication' }),
    sections: (issue, _, { base4 }) => base4.inverse('magazine', 'Section', 'issue.$id', issue._id),
    coverImage: (issue, _, { base4 }) => base4.reference('platform', 'Asset', issue.coverImage, { type: 'Image' }),
    redirects: (section) => {
      const { redirects } = section;
      return isArray(redirects) ? redirects : [];
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineIssue: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('magazine', 'Issue', id);
    },
  },
};
