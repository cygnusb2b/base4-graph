const productResolvers = require('../platform/product/common');

module.exports = {
  /**
   *
   */
  WebsiteProductSite: {
    ...productResolvers,
    sections: (site, _, { base4 }) => base4.inverse('website', 'Section', 'site.$id', site._id),
    options: (site, _, { base4 }) => base4.inverse('website', 'Option', 'site.$id', site._id),
  },
};
