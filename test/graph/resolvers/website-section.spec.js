require('../../connections');
const { graphql } = require('./utils');

describe('graph/resolvers/website-section', function() {

  describe('Query', function() {

    describe('website-section', function() {

      const query = `
        query websiteSection($input: ModelIdInput!) {
          websiteSection(input: $input) {
            id
            name
          }
        }
      `;
      it('should reject when the tenant is invalid.', async function() {
        const id = 1;
        const input = { id };
        const variables = { input };
        await expect(graphql({ query, variables, key: 'websiteSection', tenantKey: '' })).to.be.rejectedWith(Error, /You must provide a valid tenant key/i);
      });
      it('should reject if no record was found.', async function() {
        const id = 1;
        const input = { id };
        const variables = { input };
        await expect(graphql({ query, variables, key: 'websiteSection', tenantKey: 'as3_baseplatform' })).to.be.rejectedWith(Error, `No website section found for ID ${id}`);
      });
    });

  });

});
