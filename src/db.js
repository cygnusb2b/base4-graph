const { MongoClient } = require('mongodb');

let mongo;
let connected = false;
let promise;

const { MONGO_DSN } = process.env;

const DB = {
  async close(force) {
    if (promise) {
      await promise;
      await mongo.close(force);
    } else if (connected) {
      await mongo.close(force);
    }
  },
  async connect() {
    if (connected) return mongo;
    if (promise) {
      mongo = await promise;
      connected = true;
      promise = undefined;
      return mongo;
    }
    promise = MongoClient.connect(MONGO_DSN);
    mongo = await promise;
    connected = true;
    promise = undefined;
    return mongo;
  },
  async db(name) {
    const client = await this.connect();
    return client.db(name);
  },
  async collection(dbName, name) {
    const db = await this.db(dbName);
    return db.collection(name);
  },
};

DB.connect().then(() => process.stdout.write(`Successful MongoDB connection to '${MONGO_DSN}'\n`)).catch((err) => {
  setImmediate(() => {
    throw err;
  });
});

module.exports = DB;
