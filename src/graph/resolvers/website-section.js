const DB = require('../../db');
const { getIdFromRefOne } = require('../../utils');

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
      const section = await collection.findOne({ _id: id });

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
      const sectionId = getIdFromRefOne(doc.parent);
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
      const cursor = await collection.find({ 'parent.$id': sectionId });
      const sections = await cursor.toArray();
      return sections;
    },
  },
};
