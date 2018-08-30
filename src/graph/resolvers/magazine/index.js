const deepAssign = require('deep-assign');

const issue = require('./issue');
const product = require('./product');
const schedule = require('./schedule');
const section = require('./section');

module.exports = deepAssign(
  issue,
  product,
  schedule,
  section,
);
