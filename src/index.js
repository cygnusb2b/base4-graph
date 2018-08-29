const base4 = require('./connections/base4');
const env = require('./env');
const app = require('./app');
const pkg = require('../package.json');

const { PORT } = env;

base4.connect().then(() => {
  app.listen(PORT, () => {
    process.stdout.write(`🌐 Express app '${pkg.name} v${pkg.version}' listening on ${PORT}\n`);
  });
}).catch((e) => {
  setImmediate(() => {
    throw e;
  });
});
