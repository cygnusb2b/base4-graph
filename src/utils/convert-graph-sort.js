const isObject = require('./is-object');

const { isArray } = Array;

const order = (v) => {
  if (v === 'asc') return 1;
  return -1;
};

const field = v => (v === 'id' ? '_id' : v);

module.exports = (sort) => {
  if (isArray(sort)) {
    return sort.reduce((o, s) => ({ ...o, [field(s.field)]: order(s.order) }), {});
  }
  if (isObject(sort)) return { [field(sort.field)]: order(sort.order) };
  return {};
};
