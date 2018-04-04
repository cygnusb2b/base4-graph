require('../../connections');
const DB = require('../../../src/db');
const { graphql } = require('./utils');

const createTaxonomy = async (tenant, doc) => {
  const collection = await DB.collection(`${tenant}_platform`, 'Taxonomy');
  await collection.insertOne(doc);
  return doc;
};

describe('graph/resolvers/taxonomy', function() {

  describe('Query', function() {

    describe('taxonomy', function() {
      let taxonomy;
      before(async function() {
        taxonomy = await createTaxonomy('as3_baseplatform', {
          _id: 1234,
          name: 'Test tax',
        });
      });

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
      it('should return the requested taxonomy.', async function() {
        const id = taxonomy._id;
        const input = { id };
        const variables = { input };
        const promise = graphql({ query, variables, key: 'taxonomy', tenantKey: 'as3_baseplatform' });
        await expect(promise).to.eventually.be.an('object').with.property('id', id);
        const data = await promise;
        expect(data.name).to.equal(taxonomy.name);
      });
    });

  });

});
