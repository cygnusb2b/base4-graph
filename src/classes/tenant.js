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

class Tenant {
  constructor(key) {
    this.key = key;
  }

  isValid() {
    return tenants.includes(this.key);
  }

  check() {
    if (!this.isValid()) throw new Error(`You must provide a valid tenant key. The provided key '${this.key}' was not found.`);
  }

  toString() {
    return `${this.key}`;
  }
}

module.exports = Tenant;
