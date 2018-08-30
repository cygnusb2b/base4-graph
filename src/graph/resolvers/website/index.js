const deepAssign = require('deep-assign');

const option = require('./option');
const productSite = require('./product-site');
const schedule = require('./schedule');
const section = require('./section');

module.exports = deepAssign(
  option,
  productSite,
  schedule,
  section,
);
