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
    taxonomy: async (root, { input }, { tenant }) => {
      const { id } = input;

      const collection = await DB.collection(`${tenant}_platform`, 'Taxonomy');
      const taxonomy = await collection.findOne({ _id: parseInt(id, 10) });

      if (!taxonomy) throw new Error(`No website taxonomy found for ID ${id}`);
      return taxonomy;
    },
  },

  /**
   *
   */
  Taxonomy: {
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
      const taxonomyId = parent.oid;
      if (!taxonomyId) return null;

      const collection = await DB.collection(`${tenant}_platform`, 'Taxonomy');
      const taxonomy = await collection.findOne({ _id: taxonomyId });
      return taxonomy;
    },

    /**
     *
     */
    children: async (doc, args, { tenant }) => {
      const taxonomyId = doc._id;
      const collection = await DB.collection(`${tenant}_platform`, 'Taxonomy');
      const cursor = await collection.find({ 'parent.$id': parseInt(taxonomyId, 10) });
      const taxonomies = await cursor.toArray();
      return taxonomies;
    },
  },
};
