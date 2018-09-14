const { isArray } = Array;

module.exports = {
  /**
   *
   */
  PlatformContent: {
    /**
     *
     */
    __resolveType(obj) {
      return `PlatformContent${obj.type}`;
    },
  },

  /**
   *
   */
  PlatformScheduledContentConnection: {
    totalCount: ({ paginated }) => paginated.getTotalCount(),
    edges: ({ edges }) => edges,
    pageInfo: ({ paginated }) => ({
      hasNextPage: () => paginated.hasNextPage(),
      endCursor: () => paginated.getEndCursor(),
    }),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteScheduledPlatformContent: async (_, { input }, { auth, base4 }) => {
      auth.check();
      const {
        sectionId,
        optionId,
        excludeSectionIds,
        includeContentTypes,
        excludeContentTypes,
        requiresImage,
        sectionBubbling,
        pagination,
      } = input;

      const now = new Date();

      let sectionIds = sectionId;
      if (sectionBubbling) {
        const section = await base4.strictFindById('website.Section', sectionId, {}, { descendantIds: 1 });
        const { descendantIds } = section;
        if (isArray(descendantIds) && descendantIds.length) {
          sectionIds = { $in: descendantIds };
        }
      }

      const $elemMatch = {
        sectionId: sectionIds,
        start: { $lte: now },
        $and: [
          {
            $or: [
              { end: { $gt: now } },
              { end: { $exists: false } },
            ],
          },
        ],
      };

      if (!optionId) {
        const defaultOption = await base4.findOne('website.Option', {
          criteria: { name: 'Standard', status: 1 },
          projection: { _id: 1 },
        });
        if (!defaultOption) throw new Error('No default/standard option was found.');
        $elemMatch.optionId = defaultOption._id;
      } else {
        $elemMatch.optionId = optionId;
      }

      if (excludeSectionIds.length) {
        $elemMatch.$and.push({ sectionId: { $nin: excludeSectionIds } });
      }

      const criteria = { schedules: { $elemMatch } };

      if (requiresImage) {
        criteria.hasImage = true;
      }
      if (includeContentTypes.length) {
        if (!isArray(criteria.$and)) criteria.$and = [];
        criteria.$and.push({ contentType: { $in: includeContentTypes } });
      }
      if (excludeContentTypes.length) {
        if (!isArray(criteria.$and)) criteria.$and = [];
        criteria.$and.push({ contentType: { $nin: excludeContentTypes } });
      }

      const paginated = await base4.find('website.SectionQuery', {
        pagination,
        sort: { field: 'schedules.0.start', order: 'desc' },
        criteria,
        projection: { contentId: 1, 'schedules.$.start': 1 },
      });
      const edges = await paginated.getEdges();
      const contentIds = edges.map(({ node }) => node.contentId);
      const cursor = await base4.find('platform.Content', {
        criteria: { _id: { $in: contentIds } },
      });
      const content = await cursor.toArray();
      return {
        paginated,
        edges: edges.map((edge) => {
          const { node } = edge;
          node.start = node.schedules[0].start,
          node.content = content.find(c => c._id === node.contentId);
          return edge;
        }),
      };
    },
  },
};
