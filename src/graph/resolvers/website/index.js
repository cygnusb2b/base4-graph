const deepAssign = require('deep-assign');

const productSite = require('./product-site');
const schedule = require('./schedule');
const section = require('./section');

module.exports = deepAssign(
  productSite,
  schedule,
  section,
);
