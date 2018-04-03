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


module.exports = {
  isObject,
  extractMutationValue,
  fillMutation,
};
