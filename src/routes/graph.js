const { Router } = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('../graph/schema');

const router = Router();

const tenants = [
  'cygnus_ofcr',
  'cygnus_fhc',
  'cygnus_vspc',
  'cygnus_mprc',
  'acbm_ooh',
  'acbm_fcp',
  'acbm_sdce',
  'acbm_fl',
  'acbm_dmn',
  'indm_ien',
  'scomm_nvs',
  'scomm_cltampa',
  'scomm_cb',
  'scomm_wcp',
  'scomm_kcp',
  'scomm_nvp',
];

const mutations = [
  'Website',
  'Magazine',
  'Email',
];

router.use(
  bodyParser.json(),
  graphqlExpress((req) => {
    const tenant = req.get('X-Tenant-Key');
    let mutation = req.get('X-Mutation-Type');
    if (!mutations.includes(mutation)) mutation = 'Website';

    if (!tenants.includes(tenant)) throw new Error(`No tenant found for '${tenant}'`);
    return {
      schema,
      context: { auth: { }, tenant, mutation },
    };
  }),
);

module.exports = router;
