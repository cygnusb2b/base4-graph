const deepAssign = require('deep-assign');

const productSite = require('./product-site');
const section = require('./section');

module.exports = deepAssign(
  productSite,
  section,
);
