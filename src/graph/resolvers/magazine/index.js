const deepAssign = require('deep-assign');

const productPublication = require('./product-publication');
const section = require('./section');

module.exports = deepAssign(
  productPublication,
  section,
);
