require('dotenv').config();
require('./db');
const app = require('./app');
const pkg = require('../package.json');

const port = process.env.PORT;
const host = process.env.HOSTNAME;

const server = app.listen(port, host, () => {
  process.stdout.write(`Express app '${pkg.name}' listening on http://${host}:${port}\n`);
});

module.exports = server;
