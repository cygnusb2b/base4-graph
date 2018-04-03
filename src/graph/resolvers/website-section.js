const DB = require('../../db');
const { isObject } = require('../../utils');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSection: async (root, { input }, { tenant }) => {
      const { id } = input;

      const collection = await DB.collection(`${tenant}_website`, 'Section');
      const section = await collection.findOne({ _id: parseInt(id, 10) });

      if (!section) throw new Error(`No website section found for ID ${id}`);
      return section;
    },
  },
  /**
   *
   */
  WebsiteSection: {
    /**
     *
     */
    id: doc => doc._id,

    /**
     *
     */
    parent: async (doc, args, { tenant }) => {
      const { parent } = doc;
      if (!isObject(parent)) return null;
      const sectionId = parent.oid;
      if (!sectionId) return null;

      const collection = await DB.collection(`${tenant}_website`, 'Section');
      const section = await collection.findOne({ _id: sectionId });
      return section;
    },

    /**
     *
     */
    children: async (doc, args, { tenant }) => {
      const sectionId = doc._id;
      const collection = await DB.collection(`${tenant}_website`, 'Section');
      const cursor = await collection.find({ 'parent.$id': parseInt(sectionId, 10) });
      const sections = await cursor.toArray();
      return sections;
    },
  },
};
