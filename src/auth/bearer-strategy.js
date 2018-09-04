const { Strategy } = require('passport-http-bearer');
const db = require('../connections/base4');

const getApiKey = async (key) => {
  if (!key) return null;
  const collection = await db.collection('platform', 'GraphKeys');
  const doc = await collection.findOne({ key });
  if (!doc) return null;
  return doc.key;
};

module.exports = new Strategy((token, next) => {
  getApiKey(token).then(key => next(null, key)).catch(next);
});
