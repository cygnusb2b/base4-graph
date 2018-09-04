const deepAssign = require('deep-assign');

module.exports = deepAssign(
  {
    /**
     *
     */
    PlatformContent: {
      /**
       *
       */
      __resolveType(obj) {
        return `PlatformContent${obj.type}`;
      },
    },
  },
);
