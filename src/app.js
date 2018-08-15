const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bearer = require('./auth/bearer-strategy');
const routes = require('./routes');

const app = express();
const CORS = cors();

passport.use(bearer);

app.use(passport.initialize());
app.use(CORS);
app.options('*', CORS);

routes(app);

module.exports = app;
