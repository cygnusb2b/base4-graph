const deepAssign = require('deep-assign');

const product = require('./product');
const section = require('./section');

module.exports = deepAssign(
  product,
  section,
);
