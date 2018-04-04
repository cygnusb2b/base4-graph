require('../../connections');
const { graphql } = require('./utils');

describe('graph/resolvers/story', function() {

  describe('Query', function() {

    describe('story', function() {

      const query = `
        query Story($input: ModelIdInput!) {
          story(input: $input) {
            id
            title
          }
        }
      `;
      it('should reject when the tenant is invalid.', async function() {
        const id = 1;
        const input = { id };
        const variables = { input };
        await expect(graphql({ query, variables, key: 'story', tenantKey: '' })).to.be.rejectedWith(Error, /You must provide a valid tenant key/i);
      });
      it('should reject if no record was found.', async function() {
        const id = 1;
        const input = { id };
        const variables = { input };
        await expect(graphql({ query, variables, key: 'story', tenantKey: 'as3_baseplatform' })).to.be.rejectedWith(Error, `No story found for ID ${id}`);
      });
    });

  });

});
