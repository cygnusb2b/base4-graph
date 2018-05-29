const { Strategy } = require('passport-http-bearer');
const { getApiKey } = require('../utils');

module.exports = new Strategy((token, next) => {
  getApiKey(token).then(key => next(null, key)).catch(next);
});
