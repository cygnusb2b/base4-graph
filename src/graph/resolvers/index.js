const { MongoClient } = require('mongodb');
const { DateType } = require('../custom-types');

let mongoClient;
const getClient = async () => {
  const dsn = 'mongodb://mongo.platform.baseplatform.io:27017/?replicaSet=platform&connectTimeoutMS=200&journal=true&readPreference=nearest';
  if (mongoClient) return mongoClient;
  mongoClient = await MongoClient.connect(dsn);
  process.stdout.write(`Connected to MongoDB DSN ${dsn}\n`);
  return mongoClient;
};

module.exports = {
  /**
   *
   */
  Date: DateType,

  Story: {
    primaryImage: async (story, args, { tenant }) => {
      const client = await getClient();
      const db = client.db(`${tenant}_platform`);
      const image = await db.collection('Asset').findOne({ _id: story.primaryImage.id });
      return image;
    },
    images: async (story, args, { tenant }) => {
      const client = await getClient();
      const db = client.db(`${tenant}_platform`);
      if (!story.images.length) return [];
      const cursor = await db.collection('Asset').find({ _id: { $in: story.images } });
      const images = await cursor.toArray();
      return images;
    },
    taxonomy: async (story, args, { tenant }) => {
      const { taxonomy } = story;
      const client = await getClient();
      const db = client.db(`${tenant}_platform`);
      if (!Array.isArray(taxonomy) || !taxonomy.length) return [];

      const ids = taxonomy.map(tax => tax.oid);
      const cursor = await db.collection('Taxonomy').find({ _id: { $in: ids } });
      const docs = await cursor.toArray();
      return docs;
    },
    primarySection: async (story, args, { tenant }) => {
      const { primarySection } = story;
      if (!primarySection) return null;

      const client = await getClient();
      const db = client.db(`${tenant}_website`);

      const image = await db.collection('Section').findOne({ _id: primarySection });
      return image;
    },
  },

  Image: {
    id: doc => doc._id,
  },

  Taxonomy: {
    id: doc => doc._id,
  },

  WebsiteSection: {
    id: doc => doc._id,
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    ping: () => 'pong',

    story: async (root, { input }, { tenant }) => {
      const { id } = input;

      const client = await getClient();
      const db = client.db(`${tenant}_platform`);
      const story = await db.collection('Content').findOne({ _id: parseInt(id, 10) });

      if (!story) throw new Error(`No story found for ID ${id}`);

      const { primarySection } = story.mutations.Website;

      return {
        id: story._id,
        name: story.name,
        teaser: story.teaser,
        body: story.body,
        primaryImage: {
          id: story.primaryImage,
        },
        images: story.images || [],
        taxonomy: story.taxonomy || [],
        primarySection: primarySection.oid,
      };
    },
  },
};
