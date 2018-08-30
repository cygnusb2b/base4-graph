module.exports = {
  /**
   *
   */
  EmailProductDeployment: {
    /**
     *
     * @param {object} obj
     */
    __resolveType(obj) {
      if (obj.type === 'Newsletter') return 'EmailProductNewsletter';
      if (obj.type === 'ThirdParty') return 'EmailProductThirdParty';
      return null;
    },
  },
};
