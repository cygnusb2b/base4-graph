const graphql = require('./graphql');
const timings = require('./timings');

module.exports = (app) => {
  app.use('/graphql', graphql);
  app.use('/timings', timings);
};
