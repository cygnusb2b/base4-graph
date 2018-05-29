const DB = require('../../db');
const {
  extractMutationValue,
  fillMutation,
  getIdFromRefOne,
  getIdsFromRefMany,
  getContacts,
  getUser,
  getImages,
  getTaxonomies,
  getPrimaryImage,
} = require('../../utils');

const { isArray } = Array;
const contentTypes = ['Article', 'Blog', 'MediaGallery', 'News', 'Video', 'PressRelease', 'Webinar', 'Podcast'];

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    story: async (root, { input }, { tenant, auth }) => {
      auth.check();
      tenant.check();
      const { id } = input;

      const collection = await DB.collection(`${tenant}_platform`, 'Content');
      const story = await collection.findOne({ _id: id, type: { $in: contentTypes } });

      if (!story) throw new Error(`No story found for ID ${id}`);
      return story;
    },

    allStories: async (root, { input }, { tenant, auth }) => {
      auth.check();
      tenant.check();

      const { limit, type, status } = input;
      if (type && !contentTypes.includes(type)) {
        throw new Error('Invalid content type.');
      }
      const types = type ? [type] : contentTypes;

      const collection = await DB.collection(`${tenant}_platform`, 'Content');
      const cursor = await collection.find({
        status,
        type: { $in: types },
      }).limit(limit || 10).sort({ published: -1 });
      const stories = await cursor.toArray();
      return stories;
    },
  },

  /**
   *
   */
  Story: {
    /**
     *
     */
    id: doc => doc._id,
    title: (doc, args, { mutation }) => fillMutation(doc, mutation, 'name'),
    teaser: (doc, args, { mutation }) => fillMutation(doc, mutation, 'teaser'),
    body: (doc, args, { mutation }) => fillMutation(doc, mutation, 'body'),
    shortTitle: doc => doc.shortName,
    createdAt: doc => doc.created,
    updatedAt: doc => doc.updated,
    publishedAt: doc => doc.published,
    slug: story => extractMutationValue(story, 'Website', 'slug'),
    seoTitle: story => extractMutationValue(story, 'Website', 'seoTitle'),

    /**
     *
     */
    primaryImage: async (story, args, { tenant }) => getPrimaryImage(tenant, story.primaryImage),

    /**
     *
     */
    images: async (story, args, { tenant }) => getImages(tenant, story.images),

    /**
     *
     */
    taxonomies: async (story, args, { tenant }) => getTaxonomies(tenant, story.taxonomy),

    /**
     *
     */
    primarySection: async (story, args, { tenant }) => {
      const primarySection = extractMutationValue(story, 'Website', 'primarySection');
      const sectionId = getIdFromRefOne(primarySection);
      if (!sectionId) return null;

      const collection = await DB.collection(`${tenant}_website`, 'Section');
      const section = await collection.findOne({ _id: sectionId });
      return section;
    },

    primarySite: async (story, args, { tenant }) => {
      const primarySite = extractMutationValue(story, 'Website', 'primarySite');
      if (!primarySite) return null;

      const collection = await DB.collection(`${tenant}_platform`, 'Product');
      const product = await collection.findOne({ _id: primarySite, type: 'Site' });
      return product;
    },

    company: async (story, args, { tenant }) => {
      const collection = await DB.collection(`${tenant}_platform`, 'Content');
      if (story.company) {
        const company = await collection.findOne({ _id: story.company, type: 'Company' });
        return company;
      }
      const { relatedTo } = story;
      if (!isArray(relatedTo) || !relatedTo.length) return null;

      const contentIds = getIdsFromRefMany(relatedTo);
      if (!contentIds.length) return null;
      const doc = await collection.findOne({ _id: { $in: contentIds }, type: 'Company' });
      return doc;
    },

    /**
     *
     */
    createdBy: (story, args, { tenant }) => getUser(tenant, story.createdBy),

    /**
     *
     */
    updatedBy: (story, args, { tenant }) => getUser(tenant, story.updatedBy),

    /**
     *
     */
    authors: (story, args, { tenant }) => getContacts(tenant, story.authors),
    contributors: (story, args, { tenant }) => getContacts(tenant, story.contributors),
    photographers: (story, args, { tenant }) => getContacts(tenant, story.photographers),
  },
};
