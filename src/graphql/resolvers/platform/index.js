const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');
const entity = require('./entity');
const product = require('./product');
const schedule = require('./schedule');
const section = require('./section');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  content,
  entity,
  product,
  schedule,
  section,
  security,
  taxonomy,
);
