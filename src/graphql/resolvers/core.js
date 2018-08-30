/**
 * Core resolvers shared by _all_ resolvers... assuming
 * they are applied :)
 */
module.exports = {
  id: doc => doc._id,
};
