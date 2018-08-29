const DB = require('./connections/base4');

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

/**
 *
 * @param {string} tenant
 * @param {string} userId
 */
const getUser = async (tenant, userId) => {
  if (!userId) return null;
  const collection = await DB.collection(`${tenant}_platform`, 'User');
  const user = await collection.findOne({ _id: userId });
  return user;
};

/**
 *
 * @param {string} tenant
 * @param {?Object[]} taxonomyRefs
 */
const getTaxonomies = async (tenant, taxonomyRefs) => {
  const taxonomyIds = getIdsFromRefMany(taxonomyRefs);
  if (!taxonomyIds.length) return [];

  const collection = await DB.collection(`${tenant}_platform`, 'Taxonomy');
  const cursor = await collection.find({ _id: { $in: taxonomyIds } });
  const docs = await cursor.toArray();
  return docs;
};

/**
 *
 * @param {string} tenant
 * @param {?String[]} imageIds
 */
const getImages = async (tenant, imageIds) => {
  if (!isArray(imageIds) || !imageIds.length) return [];

  const collection = await DB.collection(`${tenant}_platform`, 'Asset');
  const cursor = await collection.find({ _id: { $in: imageIds } });
  const images = await cursor.toArray();
  return images;
};

/**
 *
 * @param {string} tenant
 * @param {?string} imageId
 */
const getPrimaryImage = async (tenant, imageId) => {
  if (!imageId) return null;

  const collection = await DB.collection(`${tenant}_platform`, 'Asset');
  const image = await collection.findOne({ _id: imageId });
  return image;
};

module.exports = {
  isObject,
  extractMutationValue,
  fillMutation,
  getContacts,
  getIdFromRefOne,
  getIdsFromRefMany,
  getUser,
  getTaxonomies,
  getImages,
  getPrimaryImage,
};
