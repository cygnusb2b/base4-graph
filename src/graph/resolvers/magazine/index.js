const deepAssign = require('deep-assign');

const issue = require('./issue');
const productPublication = require('./product-publication');
const section = require('./section');

module.exports = deepAssign(
  issue,
  productPublication,
  section,
);
