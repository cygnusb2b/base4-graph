const deepAssign = require('deep-assign');

const option = require('./option');
const product = require('./product');
const schedule = require('./schedule');
const section = require('./section');

module.exports = deepAssign(
  option,
  product,
  schedule,
  section,
);
