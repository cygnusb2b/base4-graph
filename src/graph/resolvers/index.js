const deepAssign = require('deep-assign');
const { DateType } = require('../custom-types');
const { extractMutationValue } = require('../../utils');

const story = require('./story');
const websiteSection = require('./website-section');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(story, websiteSection, taxonomy, {
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
  Query: {
    /**
     *
     */
    ping: () => 'pong',
  },
});
