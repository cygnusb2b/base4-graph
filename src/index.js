require('./db');
const env = require('./env');
const app = require('./app');
const pkg = require('../package.json');

const { PORT } = env;

const server = app.listen(PORT, () => {
  process.stdout.write(`Express app '${pkg.name} v${pkg.version}' listening on ${PORT}\n`);
});

module.exports = server;
