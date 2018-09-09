db.getCollection('Schedule').aggregate([
  {
    $match: {
      status: 1,
      contentStatus: 1,
      published: { $exists: true },
      section: { $exists: true },
      option: { $exists: true },
      'content.$id': { $exists: true },
    },
  },
  { $addFields: { contentArray: { $objectToArray: '$content' } } },
  { $unwind: '$contentArray' },
  { $match: { 'contentArray.k': '$id' } },
  {
    $project: {
      contentId: '$contentArray.v',
      sectionId: '$section',
      optionId: '$option',
      contentType: '$content.type',
      hasImage: { $ifNull: ['$hasPrimaryImage', false] },
      created: ISODate(),
      start: {
        $cond: {
          if: { $gt: ['$startDate', '$published'] },
          then: '$startDate',
          else: '$published',
        },
      },
      end: {
        $cond: {
          if: { $lt: [{ $ifNull: ['$endDate', ISODate('2038-01-01T00:00:00')] }, { $ifNull: ['$expires', ISODate('2038-01-01T00:00:00')] }] },
          then: '$endDate',
          else: '$expires',
        },
      },
    },
  },
  { $out: 'SectionQuery' }
]);
