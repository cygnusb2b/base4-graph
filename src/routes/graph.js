const { Router } = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlExpress } = require('apollo-server-express');
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

const mutations = [
  'Website',
  'Magazine',
  'Email',
];

router.use(
  authenticate,
  bodyParser.json(),
  graphqlExpress((req) => {
    const { auth } = req;
    const tenant = new Tenant(req.get('X-Tenant-Key'));
    let mutation = req.get('X-Mutation-Type');
    if (!mutations.includes(mutation)) mutation = 'Website';
    return {
      schema,
      context: { auth, tenant, mutation },
    };
  }),
);

module.exports = router;
