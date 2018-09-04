// require('../connections');
// const app = require('../../src/app');
// const router = require('../../src/routes/graph');

// describe('routes/graph', function() {
//   it('should export a router function.', function(done) {
//     expect(router).to.be.a('function');
//     expect(router).itself.to.respondTo('use');
//     done();
//   });

//   const successfulResponse = (res) => {
//     const { body, status } = res;
//     expect(res.get('Content-Type')).to.match(/json/i);
//     expect(status).to.equal(200);
//     expect(body).to.be.an('object').with.property('data');
//     expect(body).to.not.have.property('errors');
//   };

//   describe('ping', function() {
//     const query = `
//       query Ping {
//         ping
//       }
//     `;
//     const properBody = ({ body }) => {
//       const { data } = body;
//       expect(data).to.be.an('object').with.property('ping').to.equal('pong');
//     };
//     it('should successfully respond to POST.', function(done) {
//       request(app).post('/graph').send({ query })
//         .expect(successfulResponse)
//         .expect(properBody)
//         .end(done);
//     });
//     it('should successfully respond to GET.', function(done) {
//       // Used merely to confirm that graph will respond to GET requests.
//       request(app).get('/graph').query({ query })
//       .expect(successfulResponse)
//       .expect(properBody)
//       .end(done);
//     });
//   });

// });
