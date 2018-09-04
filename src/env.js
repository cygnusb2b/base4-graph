const { isURL } = require('validator');
const {
  cleanEnv,
  port,
  makeValidator,
} = require('envalid');

/* istanbul ignore next */
const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string startng with mongodb://');
});

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The port that Express will listen on.', default: 8937 }),
  MONGO_DSN: mongodsn({ desc: 'The MongoDB DSN to connect to.' }),
});
