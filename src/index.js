require('dotenv').config();
require('./db');
const app = require('./app');
const pkg = require('../package.json');

const port = process.env.PORT;

const server = app.listen(port, () => {
  process.stdout.write(`Express app '${pkg.name}' listening on ${port}\n`);
});

module.exports = server;
