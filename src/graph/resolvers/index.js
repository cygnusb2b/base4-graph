const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
const { DateType } = require('../custom-types');

const email = require('./email');
const magazine = require('./magazine');
const platform = require('./platform');
const website = require('./website');

module.exports = deepAssign(
  email,
  magazine,
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
