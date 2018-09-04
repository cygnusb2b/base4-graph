const deepAssign = require('deep-assign');

const contact = require('./contact');
const product = require('./product');

module.exports = deepAssign(
  contact,
  product,
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

    /**
     *
     */
    Query: {
      platformContent: async (_, { input }, { auth, base4 }) => {
        auth.check();
        const { id } = input;
        return base4.strictFindById('platform', 'Content', id);
      },
    },
  },
);
