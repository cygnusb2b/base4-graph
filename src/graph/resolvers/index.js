const deepAssign = require('deep-assign');
const { DateType } = require('../custom-types');
const { extractMutationValue } = require('../../utils');

const story = require('./story');
const websiteSection = require('./website-section');
const taxonomy = require('./taxonomy');
const user = require('./user');
const contact = require('./contact');
const company = require('./company');

module.exports = deepAssign(story, websiteSection, taxonomy, user, contact, company, {
  /**
   *
   */
  Date: DateType,

    /**
     *
     */
    AssetImage: {
      id: doc => doc._id,
      approvedWeb: doc => extractMutationValue(doc, 'Website', 'approved'),
      path: doc => `${doc.filePath}/${doc.fileName}`,
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
