const { graphql } = require('graphql');
const Tenant = require('../../../src/classes/tenant');
const schema = require('../../../src/graph/schema');
const Credentials = require('../../../src/auth/credentials');

const buildContext = async ({ tenantKey } = {}) => {
  const tenant = new Tenant(tenantKey);
  const auth = new Credentials({ key: '1234' });
  return { auth, tenant };
};

module.exports = {
  async graphql({ query, variables, key, tenantKey }) {
    const contextValue = await buildContext({ tenantKey });
    return graphql({ schema, source: query, variableValues: variables, contextValue })
      .then((response) => {
        if (response.errors) throw response.errors[0];
        return response.data[key];
      });
  },
}
