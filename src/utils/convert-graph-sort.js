const isObject = require('./is-object');

const { isArray } = Array;

const order = (v) => {
  if (v === 'asc') return 1;
  return -1;
};

module.exports = (sort) => {
  if (isArray(sort)) {
    return sort.reduce((o, s) => ({ ...o, [s.field]: order(s.order) }), {});
  }
  if (isObject(sort)) return { [sort.field]: order(sort.order) };
  return {};
};
