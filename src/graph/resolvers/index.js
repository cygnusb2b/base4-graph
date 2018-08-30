const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
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
    JSON: GraphQLJSON,

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
