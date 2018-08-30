const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');
const section = require('./section');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  content,
  section,
  security,
  taxonomy,
);
