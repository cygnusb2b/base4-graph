require('./connections');
const server = require('../src/index');

describe('index', function() {
  it('should load.', function(done) {
    done();
  });
  after(function() {
    // Close the app.
    server.close();
  });
});
