module.exports = {
  /**
   *
   */
  PlatformSchedule: {
    /**
     *
     * @param {object} obj
     */
    async __resolveType(obj, { base4 }) {
      const product = await base4.reference('platform', 'Product', obj.product);
      if (!product) return null;
      switch (product.type) {
        case 'Site':
          return 'WebsiteSection';
        case 'Publication':
          return 'MagazineSection';
        case 'Newsletter':
          return 'EmailSection';
        case 'ThirdParty':
          return 'EmailSection';
        default:
          return null;
      }
    },
  },
};
