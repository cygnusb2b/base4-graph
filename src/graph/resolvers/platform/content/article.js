const contentResolvers = require('./common');

module.exports = {
  /**
   *
   */
  PlatformContentArticle: {
    ...contentResolvers,

    /**
     *
     */
    sidebars: () => ([{ body: 'sb1' }, { body: 'sb2' }]),
  },
};
