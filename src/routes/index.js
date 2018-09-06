const buildContentQuery = require('./build-content-query');
const graphql = require('./graphql');
const timings = require('./timings');

module.exports = (app) => {
  app.use('/build-content-query', buildContentQuery);
  app.use('/graphql', graphql);
  app.use('/timings', timings);
};
