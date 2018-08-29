const Tenant = require('../classes/tenant');
const isObject = require('../utils/is-object');

const { isArray } = Array;

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

  /**
   * Extracts a mutation value from a document for the provided type and field.
   *
   * @param {object} doc The MongoDB document to extract from.
   * @param {string} type The mutation type, e.g. `Website`.
   * @param {string} field The field key of the mutation.
   */
  static extractMutationValue(doc, type, field) {
    const { mutations } = doc;
    if (!isObject(mutations)) return null;
    const keyValues = mutations[type];
    if (!isObject(keyValues)) return null;
    return keyValues[field];
  }

  /**
   * Fills a mutation value from a document for the provided type and field.
   * If a mutation value is found, it will use it, otherwise it will
   * fallback to the "standard" field on the document.
   *
   * @param {object} doc
   * @param {string} type
   * @param {string} field
   */
  static fillMutation(doc, type, field) {
    const value = Base4.extractMutationValue(doc, type, field);
    return value || doc[field];
  }

  /**
   * Gets an array of Mongo IDs from an array of DBRefs.
   *
   * @param {?array} refs
   */
  static getIdsFromRefMany(refs) {
    if (!isArray(refs) || !refs.length) return [];
    return refs.map(ref => ref.oid).filter(id => id);
  }

  /**
   * Returns the Mongo ID from a DBRef.
   *
   * @param {?object} ref
   */
  static getIdFromRefOne(ref) {
    if (!isObject(ref)) return null;
    return ref.oid || null;
  }
}

module.exports = Base4;
