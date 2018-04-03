const { MongoClient } = require('mongodb');

let mongo;
const dsn = 'mongodb://mongo.platform.baseplatform.io:27017/?replicaSet=platform&connectTimeoutMS=200&journal=true&readPreference=nearest';

module.exports = {
  async connect() {
    if (mongo) return mongo;
    mongo = await MongoClient.connect(dsn);
    process.stdout.write(`Connected to MongoDB DSN ${dsn}\n`);
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
