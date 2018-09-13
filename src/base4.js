const { ApolloError, UserInputError } = require('apollo-server-express');
const { ObjectID } = require('mongodb');
const objectPath = require('object-path');
const Tenant = require('./classes/tenant');
const Pagination = require('./pagination');
const isObject = require('./utils/is-object');

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
  'email',
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

  async find(modelName, {
    pagination,
    sort,
    limit = 0,
    criteria,
    projection,
  }) {
    if (pagination) {
      return this.paginate(modelName, {
        pagination,
        sort,
        criteria,
        projection,
      });
    }
    const { namespace, resource } = Base4.parseModelName(modelName);
    const collection = await this.collection(namespace, resource);
    if (sort) return collection.find(criteria, { projection }).sort(sort).limit(limit);
    return collection.find(criteria, { projection }).limit(limit);
  }

  async findOne(modelName, { criteria, projection }) {
    const { namespace, resource } = Base4.parseModelName(modelName);
    const collection = await this.collection(namespace, resource);
    return collection.findOne(criteria, { projection });
  }

  async strictFindOne(modelName, { criteria, projection }) {
    const doc = await this.findOne(modelName, { criteria, projection });
    if (!doc) throw new ApolloError(`No ${modelName} record found for ID ${JSON.stringify(criteria)}`, 'RECORD_NOT_FOUND');
    return doc;
  }

  async findById(modelName, id, criteria, projection) {
    if (!id) return null;
    const { namespace, resource } = Base4.parseModelName(modelName);
    const collection = await this.collection(namespace, resource);
    return collection.findOne({ ...criteria, _id: Base4.coerceID(id) }, { projection });
  }

  async strictFindById(modelName, id, criteria, projection) {
    const doc = await this.findById(modelName, id, criteria, projection);
    if (!doc) throw new ApolloError(`No ${modelName} record found for ID ${id}`, 'RECORD_NOT_FOUND');
    return doc;
  }

  /**
   *
   * @param {string} modelName
   * @param {object} params
   * @param {?object} params.pagination
   * @param {?object} params.sort
   * @param {?object} params.criteria
   */
  async paginate(modelName, {
    pagination = {},
    sort = {},
    criteria,
    projection,
  }) {
    const { namespace, resource } = Base4.parseModelName(modelName);
    const collection = await this.collection(namespace, resource);
    const { first, after } = pagination;
    return new Pagination(collection, {
      sort,
      pagination: { first, after: Base4.coerceID(after) },
      criteria,
      projection,
    });
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
   * Returns a reference-one document for the provided document, model name and ref fields.
   *
   * For example, to retrieve the `createdBy` document referenced on a `Content` document,
   * run the following:
   *
   * ```
   * referenceOne({
   *  doc: content,
   *  relatedModel: 'platform.User',
   *  localField: 'createdBy',
   *  foreignField: '_id',
   * });
   * ```
   *
   * @param {object} params The function parameters.
   * @param {object} params.doc The document to pull the reference data from.
   * @param {string} params.relatedModel The reference's model name, e.g. `platform.Content`.
   * @param {string} params.localField The local document field to retreive the ref value from.
   * @param {string} params.foreignField The foreign/reference document field to query against.
   * @param {?object} params.criteria Additional query criteria to add.
   * @returns {Promise<null|object>}
   */
  async referenceOne({
    doc,
    relatedModel,
    localField,
    foreignField,
    criteria,
    projection,
  }) {
    const ref = objectPath.get(doc, localField);
    const id = Base4.extractRefId(ref);
    if (!id) return null;
    const { namespace, resource } = Base4.parseModelName(relatedModel);
    const collection = await this.collection(namespace, resource);
    return collection.findOne({ ...criteria, [foreignField]: id }, { projection });
  }

  /**
   * Returns an array of reference-many documents for the
   * provided document, model name and ref fields.
   *
   * For example, to retrieve the `taxonomy` documents referenced on a `Content` document,
   * run the following:
   *
   * ```
   * referenceMany({
   *  doc: content,
   *  relatedModel: 'platform.Taxonomy',
   *  localField: 'taxonomy',
   *  foreignField: '_id',
   * });
   * ```
   *
   * @param {object} params The function parameters.
   * @param {object} params.doc The document to pull the reference data from.
   * @param {string} params.relatedModel The reference's model name, e.g. `platform.Content`.
   * @param {string} params.localField The local document field to retreive the ref values from.
   * @param {string} params.foreignField The foreign/reference document field to query against.
   * @param {?object} params.criteria Additional query criteria to add.
   * @param {?object} params.sort Sort criteria to add, in MongoDB sort format.
   * @returns {Promise<object[]>}
   */
  async referenceMany({
    doc,
    relatedModel,
    localField,
    foreignField,
    criteria,
    sort,
    pagination,
    projection,
  }) {
    const refs = objectPath.get(doc, localField);
    const ids = Base4.extractRefIds(isArray(refs) ? refs : [refs]);
    const query = { ...criteria, [foreignField]: { $in: ids } };
    if (pagination) {
      return this.paginate(relatedModel, {
        pagination,
        sort,
        criteria: query,
        projection,
      });
    }
    const { namespace, resource } = Base4.parseModelName(relatedModel);
    const collection = await this.collection(namespace, resource);
    if (sort) return collection.find(query, { projection }).sort(sort);
    return collection.find(query, { projection });
  }

  /**
   * Parses a model name into its namespace and resource parts.
   *
   * For example, `platform.Content` becomes `{ namespace: 'platform', resource: 'Content' }`
   *
   * @param {string} name
   * @returns {object}
   */
  static parseModelName(name) {
    const [namespace, resource] = name.split('.');
    return { namespace, resource };
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
   * Coerces a string ID to either a MongoDB ObjectID or an integer.
   *
   * If the `id` value is not a string, or does not match the requirements for
   * the above, the `id` value will be returned as-is.
   *
   * @param {*} id
   */
  static coerceID(id) {
    if (typeof id !== 'string') return id;
    if (/^[a-f0-9]{24}$/.test(id)) return new ObjectID(id);
    if (/^\d+$/.test(id)) return Number(id);
    return id;
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
