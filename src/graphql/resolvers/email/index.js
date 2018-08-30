const deepAssign = require('deep-assign');

const product = require('./product');
const schedule = require('./schedule');
const section = require('./section');

module.exports = deepAssign(
  product,
  schedule,
  section,
);
