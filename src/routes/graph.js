const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const passport = require('passport');
const Base4 = require('../base4');
const db = require('../connections/base4');
const Tenant = require('../classes/tenant');
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

const mutations = [
  'Website',
  'Magazine',
  'Email',
];

const server = new ApolloServer({
  schema,
  playground: false,
  context: ({ req }) => {
    const { auth } = req;

    // @todo Remove tenant call and mutation stuff from here...
    const tenant = new Tenant(req.get('X-Tenant-Key'));
    let mutation = req.get('X-Mutation-Type');
    if (!mutations.includes(mutation)) mutation = 'Website';

    // @todo But keep this...
    const base4 = new Base4({ db, tenantKey: req.get('X-Tenant-Key') });
    return {
      auth,
      base4,
      tenant,
      mutation,
    };
  },
});
server.applyMiddleware({ app: router, path: '/' });

module.exports = router;
