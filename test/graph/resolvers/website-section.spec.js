// require('../../connections');
// const DB = require('../../../src/db');
// const { graphql } = require('./utils');

// const createSection = async (tenant, doc) => {
//   const collection = await DB.collection(`${tenant}_website`, 'Section');
//   await collection.insertOne(doc);
//   return doc;
// };

// describe('graph/resolvers/website-section', function() {

//   describe('Query', function() {

//     describe('websiteSection', function() {
//       let section;
//       before(async function() {
//         section = await createSection('as3_baseplatform', {
//           _id: 1234,
//           name: 'Test section',
//         });
//       });

//       const query = `
//         query websiteSection($input: ModelIdInput!) {
//           websiteSection(input: $input) {
//             id
//             name
//           }
//         }
//       `;
//       it('should reject when the tenant is invalid.', async function() {
//         const id = 1;
//         const input = { id };
//         const variables = { input };
//         await expect(graphql({ query, variables, key: 'websiteSection', tenantKey: '' })).to.be.rejectedWith(Error, /You must provide a valid tenant key/i);
//       });
//       it('should reject if no record was found.', async function() {
//         const id = 1;
//         const input = { id };
//         const variables = { input };
//         await expect(graphql({ query, variables, key: 'websiteSection', tenantKey: 'as3_baseplatform' })).to.be.rejectedWith(Error, `No website section found for ID ${id}`);
//       });
//       it('should return the requested taxonomy.', async function() {
//         const id = section._id;
//         const input = { id };
//         const variables = { input };
//         const promise = graphql({ query, variables, key: 'websiteSection', tenantKey: 'as3_baseplatform' });
//         await expect(promise).to.eventually.be.an('object').with.property('id', id);
//         const data = await promise;
//         expect(data.name).to.equal(section.name);
//       });
//     });

//   });

// });
