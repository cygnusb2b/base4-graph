module.exports = {
  /**
   *
   */
  PlatformSection: {
    /**
     *
     * @param {object} obj
     */
    __resolveType(obj) {
      if (obj.site) return 'WebsiteSection';
      if (obj.deployment) return 'EmailSection';
      if (obj.publication) return 'MagazineSection';
      return null;
    },
  },
};
