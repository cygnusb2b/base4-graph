const deepAssign = require('deep-assign');
const { DateType } = require('../custom-types');

const story = require('./story');

module.exports = deepAssign(story, {
  /**
   *
   */
  Date: DateType,

  /**
   *
   */
  Image: {
    id: doc => doc._id,
  },

  /**
   *
   */
  Taxonomy: {
    id: doc => doc._id,
  },

  /**
   *
   */
  WebsiteSection: {
    id: doc => doc._id,
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    ping: () => 'pong',
  },
});
