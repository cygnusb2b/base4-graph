const {
  extractMutationValue,
  fillMutation,
  getUser,
  getImages,
  getTaxonomies,
  getPrimaryImage,
} = require('../../utils');

module.exports = {
  /**
   *
   */
  Company: {
    /**
     *
     */
    id: doc => doc._id,
    name: (doc, args, { mutation }) => fillMutation(doc, mutation, 'name'),
    teaser: (doc, args, { mutation }) => fillMutation(doc, mutation, 'teaser'),
    body: (doc, args, { mutation }) => fillMutation(doc, mutation, 'body'),
    createdAt: doc => doc.created,
    updatedAt: doc => doc.updated,
    slug: company => extractMutationValue(company, 'Website', 'slug'),
    seoTitle: company => extractMutationValue(company, 'Website', 'seoTitle'),

    /**
     *
     */
    logo: async (company, args, { tenant }) => getPrimaryImage(tenant, company.primaryImage),

    /**
     *
     */
    images: async (company, args, { tenant }) => getImages(tenant, company.images),

    /**
     *
     */
    taxonomies: async (company, args, { tenant }) => getTaxonomies(tenant, company.taxonomy),

    /**
     *
     */
    createdBy: (company, args, { tenant }) => getUser(tenant, company.createdBy),

    /**
     *
     */
    updatedBy: (company, args, { tenant }) => getUser(tenant, company.updatedBy),
  },
};
