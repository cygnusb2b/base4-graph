const productResolvers = require('../platform/product/common');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  MagazineProductPublication: {
    ...productResolvers,
    issues: (pub, _, { base4 }) => base4.inverse('magazine', 'Issue', 'publication.$id', pub._id),
    sections: (pub, _, { base4 }) => base4.inverse('magazine', 'Section', 'publication.$id', pub._id),
    coverImage: (pub, _, { base4 }) => base4.reference('platform', 'Asset', pub.coverImage, { type: 'Image' }),
    socialLinks: (site) => {
      const { socialLinks } = site;
      return isArray(socialLinks) ? socialLinks : [];
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineProductPublication: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const { id } = input;
      return base4.strictFindById('platform', 'Product', id, { type: 'Publication' });
    },
  },
};
