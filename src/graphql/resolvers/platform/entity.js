module.exports = {
  /**
   *
   */
  PlatformEntity: {
    /**
     *
     */
    __resolveType(obj) {
      return `PlatformEntity${obj.type}`;
    },
  },
};
