const DB = require('../../db');
const {
  extractMutationValue,
  fillMutation,
  getIdFromRefOne,
  getIdsFromRefMany,
  getContacts,
  getUser,
} = require('../../utils');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    story: async (root, { input }, { tenant }) => {
      const { id } = input;
      const types = ['Article', 'Blog', 'MediaGallery', 'News', 'Video', 'PressRelease', 'Webinar', 'Podcast'];

      const collection = await DB.collection(`${tenant}_platform`, 'Content');
      const story = await collection.findOne({ _id: id, type: { $in: types } });

      if (!story) throw new Error(`No story found for ID ${id}`);
      return story;
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
    primaryImage: async (story, args, { tenant }) => {
      const imageId = story.primaryImage;
      if (!imageId) return null;

      const collection = await DB.collection(`${tenant}_platform`, 'Asset');
      const image = await collection.findOne({ _id: imageId }, {
        name: 1,
        filePath: 1,
        fileName: 1,
      });
      return image;
    },

    /**
     *
     */
    images: async (story, args, { tenant }) => {
      const imageIds = story.images;
      if (!isArray(imageIds) || !imageIds.length) return [];

      const collection = await DB.collection(`${tenant}_platform`, 'Asset');
      const cursor = await collection.find({ _id: { $in: imageIds } }, {
        name: 1,
        filePath: 1,
        fileName: 1,
      });
      const images = await cursor.toArray();
      return images;
    },

    /**
     *
     */
    taxonomies: async (story, args, { tenant }) => {
      const taxonomyIds = getIdsFromRefMany(story.taxonomy);
      if (!taxonomyIds.length) return [];

      const collection = await DB.collection(`${tenant}_platform`, 'Taxonomy');
      const cursor = await collection.find({ _id: { $in: taxonomyIds } });
      const docs = await cursor.toArray();
      return docs;
    },

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
