require('../../connections');
const { graphql } = require('./utils');

describe('graph/resolvers/taxonomy', function() {

  describe('Query', function() {

    describe('taxonomy', function() {

      const query = `
        query taxonomy($input: ModelIdInput!) {
          taxonomy(input: $input) {
            id
            name
          }
        }
      `;
      it('should reject when the tenant is invalid.', async function() {
        const id = 1;
        const input = { id };
        const variables = { input };
        await expect(graphql({ query, variables, key: 'taxonomy', tenantKey: '' })).to.be.rejectedWith(Error, /You must provide a valid tenant key/i);
      });
      it('should reject if no record was found.', async function() {
        const id = 1;
        const input = { id };
        const variables = { input };
        await expect(graphql({ query, variables, key: 'taxonomy', tenantKey: 'as3_baseplatform' })).to.be.rejectedWith(Error, `No website taxonomy found for ID ${id}`);
      });
    });

  });

});
