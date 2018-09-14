# Schedule Query Collection

## Sample Model
```js
const model = {
  contentId: 20994010,
  contentType: 'Product',
  hasImage: true,
  created: ISODate('2018-09-14T11:22:32.109-05:00'),
  // The schedules array *must* be sorted by start, descending so the most recent schedule appears first in the list.
  schedules: [
    {
      sectionId: 56305,
      optionId: 2,
      start: ISODate('2018-01-16T12:43:13.000-05:00'),
    },
    {
      sectionId: 56298,
      optionId: 2,
      start: ISODate('2018-01-16T12:43:11.000-05:00'),
      end: ISODatE('2018-12-31T12:43:11.000-05:00'),
    },
  ],
};
```

## Sample Query
```js
db.getCollection('SectionQueryArray').find({
  schedules: {
    $elemMatch: {
      sectionId: { $in: [56403, 56208] },
      optionId: 2,
      start: { $lte: new Date() },
      $and: [
        {
          $or: [
            { end: { $gt: new Date() } },
            { end: { $exists: false } },
          ],
        },
      ],
    },
  },
}, { contentId: 1, 'schedules.$.start': 1 }).sort({ 'schedules.0.start': -1 }).limit(20);
```

## Indexing

### Query Index
```json
{
    "schedules.sectionId" : 1,
    "schedules.optionId" : 1
}
```

### Sort Index
```json
{
    "schedules.0.start" : 1
}
```
@todo: Must determine how to handle this index with pagination.

## When Hooks Fire
When a hook is fired, all query entries for the related content ID will be removed and then all entries will be reinserted.

### Content
Anytime a content model is created or updated.

Will insert query entries based on:
- `status`
- `primaryImage`
- `published`
- `unpublished`

### Schedules
Anytime a schedule model is created, updated, or deleted.

Will insert query entries based on:
- `product`
- `section`
- `option`
- `startDate`
- `endDate`

## Notes
- The `end` field is calculated as follows:
  - If `schedule.endDate` exists use it if, and only if, it's _less than or equal to_ `content.unpublished` or `content.unpublished` is null.
  - If `schedule.endDate` does _not_ exist, use the value of `content.unplublished` (which could be null)
- The `start` field is calculated as follows:
  - If `schedule.startDate` exists use it if, and only if, it's _greater than or equal to_ `content.published`; otherwise use the `content.published` value
  - If `content.published` is not set, then a query entry should _not_ be added to the database.
