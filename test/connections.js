const DB = require('../src/db');

const connect = () => Promise.all([
  DB.connect(),
]);

const disconnect = () => Promise.all([
  DB.close(true),
]);

before(async function() {
  await connect();
});

after(async function() {
  await disconnect();
});
