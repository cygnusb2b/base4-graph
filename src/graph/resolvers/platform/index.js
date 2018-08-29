const deepAssign = require('deep-assign');

const asset = require('./asset');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  security,
  taxonomy,
);
