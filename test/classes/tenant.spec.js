const Tenant = require('../../src/classes/tenant');

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
  'as3_baseplatform',
];

describe('classes/tenant', function() {
  describe('#isValid', function() {
    ['', undefined, null, 'scomm', 'some_bad_tenant'].forEach((value) => {
      it(`should return false when the key is an empty or invalid value of '${value}'`, function(done) {
        const instance = new Tenant(value);
        expect(instance.isValid()).to.be.false;
        done();
      });
    });
    tenants.forEach((value) => {
      it(`should return true when the key is '${value}'`, function(done) {
        const instance = new Tenant(value);
        expect(instance.isValid()).to.be.true;
        done();
      });
    });
  });

  describe('#check', function() {
    ['', undefined, null, 'scomm', 'some_bad_tenant'].forEach((value) => {
      it(`should throw an error with an empty or invalid value of '${value}'`, function(done) {
        const instance = new Tenant(value);
        expect(instance.check.bind(instance)).to.throw(Error, `You must provide a valid tenant key. The provided key '${value}' was not found.`);
        done();
      });
    });
    tenants.forEach((value) => {
      it(`should not not throw when the key is '${value}'`, function(done) {
        const instance = new Tenant(value);
        expect(instance.check.bind(instance)).to.not.throw;
        done();
      });
    });
  });
});
