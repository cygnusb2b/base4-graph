const { ApolloError, UserInputError } = require('apollo-server-express');
const Tenant = require('../classes/tenant');
const isObject = require('../utils/is-object');

const { isArray } = Array;

/**
 * The Base4 collection namespaces.
 *
 * These are used to calculcate the MongoDB
 * database names.
 *
 * @type {array}
 */
const namespaces = [
  'magazine',
  'platform',
  'website',
];

/**
 * The Base4 instance, instantiated per tenant.
 *
 * @class
 */
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

  async findById(namespace, resource, id, opts) {
    if (!id) return null;
    const collection = await this.collection(namespace, resource);
    return collection.findOne({ _id: id }, opts);
  }

  async strictFindById(namespace, resource, id, opts) {
    const doc = await this.findById(namespace, resource, id, opts);
    if (!doc) throw new ApolloError(`No ${namespace} ${resource} record found for ID ${id}`, 'RECORD_NOT_FOUND');
    return doc;
  }

  /**
   *
   * @param {string} namespace The collection namespace, e.g. `platform`.
   * @param {string} resource The resource name, e.g. `Content`.
   * @returns {Promise}
   */
  collection(namespace, resource) {
    if (!namespaces.includes(namespace)) {
      throw new UserInputError(`The provided Base4 collection namespace '${namespace}' is invalid.`);
    }
    return this.db.collection(`${this.tenant.key}_${namespace}`, resource);
  }

  /**
   * Returns a reference-one document for the provided namespace, resource, and ref/id.
   *
   * For example, to retrieve the `createdBy` document referenced on a `Content` document,
   * run the following:
   *
   * `referenceOne('platform', 'User', content.createdBy);`
   *
   * @param {string} namespace The reference's namespace, e.g. `platform`.
   * @param {string} resource The reference's resource name, e.g. `Content`.
   * @param {*} ref The reference. Either an ID or a complex DBRef.
   * @returns {Promise<null|object>}
   */
  async reference(namespace, resource, ref) {
    const id = Base4.extractRefId(ref);
    if (!id) return null;
    const collection = await this.collection(namespace, resource);
    return collection.findOne({ _id: id });
  }

  /**
   * Returns an array of reference-many documents for the provided namespace, resource, and ref/id.
   *
   * For example, to retrieve the `taxonomies` documents referenced on a `Content` document,
   * run the following:
   *
   * `referenceMany('platform', 'Taxonomy', content.taxonomies);`
   *
   * @param {string} namespace The reference's namespace, e.g. `platform`.
   * @param {string} resource The reference's resource name, e.g. `Content`.
   * @param {*} ref The reference. Either an ID or a complex DBRef.
   * @returns {Promise<null|object>}
   */
  async references(namespace, resource, refs) {
    const ids = Base4.extractRefIds(refs);
    if (!ids.length) return [];
    const collection = await this.collection(namespace, resource);
    const cursor = await collection.find({ _id: { $in: ids } });
    return cursor.toArray();
  }

  async inverse(namespace, resource, field, id) {
    if (!id) return [];
    const collection = await this.collection(namespace, resource);
    const cursor = await collection.find({ [field]: id });
    return cursor.toArray();
  }

  /**
   * Gets a Mongo ID from either a complex (DBRef) or simple (ObjectID) reference.
   *
   * @param {?array} refs
   */
  static extractRefId(ref) {
    const id = isObject(ref) && ref.oid ? ref.oid : ref;
    return id || null;
  }

  /**
   * Gets an array of Mongo IDs from an array
   * of either complex (DBRef) or simple (ObjectID) references.
   *
   * @param {?array} refs
   */
  static extractRefIds(refs) {
    if (!isArray(refs) || !refs.length) return [];
    return refs.map(ref => Base4.extractRefId(ref)).filter(id => id);
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
}

module.exports = Base4;
