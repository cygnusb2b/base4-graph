const {
  cleanEnv,
  port,
  makeValidator,
} = require('envalid');

/* istanbul ignore next */
const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The port that Express will listen on.', default: 8937 }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
});
