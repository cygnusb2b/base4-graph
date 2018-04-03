const express = require('express');
const DB = require('./db');
const routes = require('./routes');

const app = express();

const port = 8937;

app.get('/', (req, res) => {
  res.send('Hi guys!');
});

routes(app);

DB.connect();
app.listen(port);
process.stdout.write(`Base4 Graph listening on port ${port}.\n`);
