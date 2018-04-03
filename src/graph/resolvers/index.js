const deepAssign = require('deep-assign');
const { DateType } = require('../custom-types');
const { extractMutationValue } = require('../../utils');

const story = require('./story');
const websiteSection = require('./website-section');

module.exports = deepAssign(story, websiteSection, {
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
  Query: {
    /**
     *
     */
    ping: () => 'pong',
  },
});
