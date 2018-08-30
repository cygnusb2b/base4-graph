const coreResolvers = require('../../core');

module.exports = {
  ...coreResolvers,
  fullName: doc => `${doc.type}: ${doc.name}`,
};
