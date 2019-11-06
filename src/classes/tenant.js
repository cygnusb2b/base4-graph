const tenants = [
  'acbm_dmn',
  'acbm_fcp',
  'acbm_fl',
  'acbm_gip',
  'acbm_ooh',
  'acbm_sdce',
  'as3_baseplatform',
  'bizbash_bzb',
  'cygnus_cavc',
  'cygnus_cpa',
  'cygnus_fhc',
  'cygnus_ll',
  'cygnus_mass',
  'cygnus_mprc',
  'cygnus_ofcr',
  'cygnus_siw',
  'cygnus_vmw',
  'cygnus_vspc',
  'ebm_ee',
  'ebm_fcn',
  'ebm_hmt',
  'ebm_hpn',
  'ebm_mlo',
  'ebm_pm',
  'ebm_pcm',
  'ebm_wto',
  'indm_cen',
  'indm_ddt',
  'indm_ien',
  'scomm_cb',
  'scomm_cltampa',
  'scomm_kcp',
  'scomm_nvp',
  'scomm_nvs',
  'scomm_wcp',
  // PennWell
  'ebm_cim',
  'ebm_ils',
  'ebm_ias',
  'ebm_lfw',
  'ebm_leds',
  'ebm_lw',
  'ebm_mae',
  'ebm_up',
  'ebm_vsd',
  'ebm_bow',
  'ebm_btr',
  'ebm_de',
  'ebm_diq',
  'ebm_os',
  'ebm_pia',
  'ebm_rdh',
  'ebm_su',
  'ebm_up',
  'ebm_ww',
  'ebm_ogj',
  'pmmi_all',
  'indm_all',
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
