const deepAssign = require('deep-assign');

const asset = require('./asset');
const taxonomy = require('./taxonomy');

module.exports = deepAssign(
  asset,
  taxonomy,
);
