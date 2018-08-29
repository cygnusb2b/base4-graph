const Tenant = require('../classes/tenant');

class Base4 {
  /**
   *
   * @param {object} params The constuctor parameters.
   * @param {object} params.db The Base4 database connection/client.
   * @param {string} params.tenantKey The Base4 tenant key, e.g. account_group.
   */
  constructor({ db, tenantKey }) {
    this.db = db;
    this.tenant = new Tenant(tenantKey);
    this.tenant.check();
  }

  /**
   *
   * @param {string} name The platform collecton name, e.g. `Content`.
   * @returns {Promise}
   */
  getPlatformCollection(name) {
    return this.db.collection(`${this.tenant.key}_platform`, name);
  }
}

module.exports = Base4;
