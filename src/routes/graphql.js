const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const passport = require('passport');
const Base4 = require('../base4');
const db = require('../connections/base4');
const Credentials = require('../auth/credentials');
const schema = require('../graph/schema');

const router = Router();

const authenticate = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, key) => {
    req.auth = new Credentials({ key, err });
    next();
  })(req, res, next);
};
router.use(authenticate);

const server = new ApolloServer({
  schema,
  playground: false,
  context: ({ req }) => {
    const { auth } = req;
    const base4 = new Base4({ db, tenantKey: req.get('X-Tenant-Key') });
    return { auth, base4 };
  },
});
server.applyMiddleware({ app: router, path: '/' });

module.exports = router;
