const deepAssign = require('deep-assign');
const paginationResolvers = require('../../../../pagination/resolvers');

const apparatus = require('./apparatus');
const article = require('./article');
const contact = require('./contact');
const inQuarters = require('./in-quarters');
const product = require('./product');

module.exports = deepAssign(
  apparatus,
  article,
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
  },
);
