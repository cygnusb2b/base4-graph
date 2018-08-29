const deepAssign = require('deep-assign');
const { DateType } = require('../custom-types');

const platform = require('./platform');
const website = require('./website');

module.exports = deepAssign(
  platform,
  website,
  {
    /**
     *
     */
    Date: DateType,

    /**
     *
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
