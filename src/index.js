const express = require('express');
const DB = require('./db');
const routes = require('./routes');

const app = express();

const port = process.env.PORT;

routes(app);

DB.connect().then(() => {
  app.listen(port);
  process.stdout.write(`Base4 Graph listening on port ${port}.\n`);
}).catch((e) => {
  throw e;
});

