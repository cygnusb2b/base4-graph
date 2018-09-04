const deepAssign = require('deep-assign');
const paginationResolvers = require('../../../../pagination/resolvers');

const apparatus = require('./apparatus');
const contact = require('./contact');
const inQuarters = require('./in-quarters');
const product = require('./product');

module.exports = deepAssign(
  apparatus,
  contact,
  inQuarters,
  product,
  {
    /**
     *
     */
    PlatformContentConnection: paginationResolvers,

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
