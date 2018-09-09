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
      const criteria = {
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
        criteria.optionId = defaultOption._id;
      } else {
        criteria.optionId = optionId;
      }

      if (sectionBubbling) {
        const section = await base4.strictFindById('website', 'Section', sectionId, {}, { descendantIds: 1 });
        const { descendantIds } = section;
        if (isArray(descendantIds) && descendantIds.length) {
          criteria.sectionId = { $in: descendantIds };
        } else {
          criteria.sectionId = sectionId;
        }
      } else {
        criteria.sectionId = sectionId;
      }

      if (excludeSectionIds.length) {
        criteria.$and.push({ sectionId: { $nin: excludeSectionIds } });
      }
      if (includeContentTypes.length) {
        criteria.$and.push({ contentType: { $in: includeContentTypes } });
      }
      if (excludeContentTypes.length) {
        criteria.$and.push({ contentType: { $nin: excludeContentTypes } });
      }
      if (requiresImage) {
        criteria.hasImage = true;
      }

      return base4.find('website.SectionQuery', {
        pagination,
        sort: { field: 'start', order: 'desc' },
        criteria,
        collate: false,
        projection: { _id: 1, contentId: 1, start: 1 },
      });
    },
  },
};
