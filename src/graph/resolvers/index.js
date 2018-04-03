const deepAssign = require('deep-assign');
const { DateType } = require('../custom-types');
const { extractMutationValue } = require('../../utils');

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
    approvedWeb: doc => extractMutationValue(doc, 'Website', 'approved'),
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
