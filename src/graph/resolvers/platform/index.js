const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');
const product = require('./product');
const section = require('./section');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  content,
  product,
  section,
  security,
  taxonomy,
);
