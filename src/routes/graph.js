const { Router } = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const Tenant = require('../classes/tenant');
const schema = require('../graph/schema');

const router = Router();

const mutations = [
  'Website',
  'Magazine',
  'Email',
];

router.use(
  bodyParser.json(),
  graphqlExpress((req) => {
    const tenant = new Tenant(req.get('X-Tenant-Key'));
    let mutation = req.get('X-Mutation-Type');
    if (!mutations.includes(mutation)) mutation = 'Website';
    return {
      schema,
      context: { auth: { }, tenant, mutation },
    };
  }),
);

module.exports = router;
