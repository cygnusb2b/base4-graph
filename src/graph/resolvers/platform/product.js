module.exports = {
  /**
   *
   */
  PlatformProduct: {
    /**
     *
     * @param {object} obj
     */
    __resolveType(obj) {
      if (obj.type === 'Newsletter') return 'EmailProductNewsletter';
      if (obj.type === 'ThirdParty') return 'EmailProductThirdParty';
      if (obj.type === 'Publication') return 'MagazineProductPublication';
      if (obj.type === 'Site') return 'WebsiteProductSite';
      return null;
    },
  },
};
