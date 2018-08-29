const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const passport = require('passport');
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
    const tenant = new Tenant(req.get('X-Tenant-Key'));
    let mutation = req.get('X-Mutation-Type');
    if (!mutations.includes(mutation)) mutation = 'Website';
    return { auth, tenant, mutation };
  },
});
server.applyMiddleware({ app: router, path: '/' });

module.exports = router;
