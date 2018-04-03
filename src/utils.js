const DB = require('./db');

const { isArray } = Array;

/**
 *
 * @param {*} v
 * @return {boolean}
 */
const isObject = v => v && typeof v === 'object';

/**
 *
 * @param {object} doc
 * @param {string} type
 * @param {string} field
 */
const extractMutationValue = (doc, type, field) => {
  const { mutations } = doc;
  if (!isObject(mutations)) return null;
  const keyValues = mutations[type];
  if (!isObject(keyValues)) return null;
  return keyValues[field];
};

/**
 *
 * @param {object} doc
 * @param {string} type
 * @param {string} field
 */
const fillMutation = (doc, type, field) => {
  const value = extractMutationValue(doc, type, field);
  return value || doc[field];
};

/**
 *
 * @param {?Array} refs
 */
const getIdsFromRefMany = (refs) => {
  if (!isArray(refs) || !refs.length) return [];
  return refs.map(ref => ref.oid).filter(id => id);
};

/**
 *
 * @param {?Object} ref
 */
const getIdFromRefOne = (ref) => {
  if (!isObject(ref)) return null;
  return ref.oid || null;
};

/**
 *
 * @param {string} tenant
 * @param {?Array} contactIds
 */
const getContacts = async (tenant, contactIds) => {
  if (!isArray(contactIds) || !contactIds.length) return [];

  const collection = await DB.collection(`${tenant}_platform`, 'Content');
  const cursor = await collection.find({ _id: { $in: contactIds }, type: 'Contact' });
  const docs = await cursor.toArray();
  return docs;
};

const getUser = async (tenant, userId) => {
  if (!userId) return null;
  const collection = await DB.collection(`${tenant}_platform`, 'User');
  const user = await collection.findOne({ _id: userId });
  return user;
};

module.exports = {
  isObject,
  extractMutationValue,
  fillMutation,
  getContacts,
  getIdFromRefOne,
  getIdsFromRefMany,
  getUser,
};
