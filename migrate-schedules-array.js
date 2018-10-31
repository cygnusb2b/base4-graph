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
      contentType: '$content.type',
      hasImage: { $ifNull: ['$hasPrimaryImage', false] },
      sectionId: '$section',
      optionId: '$option',
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
  { $sort: { start: -1 } },
  {
    $group: {
      _id: '$contentId',
      contentType: { $first: '$contentType' },
      hasImage: { $first: '$hasImage' },
      schedules: { $push: { sectionId: '$sectionId', optionId: '$optionId', start: '$start', end: '$end' } },
    },
  },
  {
    $project: {
      _id: 0,
      contentId: '$_id',
      contentType: 1,
      hasImage: 1,
      created: ISODate(),
      schedules: 1,
    },
  },
  { $out: 'SectionQuery' },
], { allowDiskUse: true });

db.getCollection('SectionQuery').createIndex({ 'schedules.sectionId' : 1, 'schedules.optionId' : 1 });
db.getCollection('SectionQuery').createIndex({ contentId: 1 }, { unique: true });
db.getCollection('SectionQuery').createIndex({ 'schedules.0.start' : -1, _id: -1 });
