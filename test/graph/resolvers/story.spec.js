require('../../connections');
const DB = require('../../../src/db');
const { graphql } = require('./utils');

const createStory = async (tenant, doc) => {
  const collection = await DB.collection(`${tenant}_platform`, 'Content');
  await collection.insertOne(doc);
  return doc;
};

describe('graph/resolvers/story', function() {

  describe('Query', function() {

    describe('story', function() {
      let story;
      before(async function() {
        story = await createStory('as3_baseplatform', {
          _id: 1234,
          name: 'Test story',
          type: 'Article',
        });
      });

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
      it('should return the requested story.', async function() {
        const id = story._id;
        const input = { id };
        const variables = { input };
        const promise = graphql({ query, variables, key: 'story', tenantKey: 'as3_baseplatform' });
        await expect(promise).to.eventually.be.an('object').with.property('id', id);
        const data = await promise;
        expect(data.title).to.equal(story.name);
      });
    });

  });

});
