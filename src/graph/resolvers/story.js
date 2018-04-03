const DB = require('../../db');
const Utils = require('../../utils');

const { isArray } = Array;

const extractMutationValue = (doc, type, field) => {
  const { mutations } = doc;
  if (!Utils.isObject(mutations)) return null;
  const keyValues = mutations[type];
  if (!Utils.isObject(keyValues)) return null;
  return keyValues[field];
};

const fillMutation = (doc, type, field) => {
  const value = extractMutationValue(doc, type, field);
  return value || doc[field];
};

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
      const story = await collection.findOne({ _id: parseInt(id, 10), type: { $in: types } });

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
      const { taxonomy } = story;
      if (!isArray(taxonomy) || !taxonomy.length) return [];
      const taxonomyIds = taxonomy.map(tax => tax.oid).filter(id => id);
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
      if (!Utils.isObject(primarySection)) return null;
      const sectionId = primarySection.oid;
      if (!sectionId) return null;

      const collection = await DB.collection(`${tenant}_website`, 'Section');
      const section = await collection.findOne({ _id: sectionId });
      return section;
    },

    slug: story => extractMutationValue(story, 'Website', 'slug'),
    seoTitle: story => extractMutationValue(story, 'Website', 'seoTitle'),
  },
};
