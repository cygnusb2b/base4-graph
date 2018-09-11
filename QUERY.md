# Schedule Query Collection

## Sample Model
```js
// Example taken from cygnus_ofcr_website::Schedule
// ObjectId("5a9567b368deea9d39658ddd")
const model = {
  priority: 1,
  sectionId: 56406,
  contentId: 20994010,
  contentType: 'Webinar',
  hasImage: true,
  start: ISODate('2018-01-09T15:50:41.000-05:00'),
  end: ISODate('2018-03-11T14:50:00.000-05:00'),
};
```

## Indexing
Because of the different query input options, multiple indexes are possible.

### Queries
- `{ "sectionId": 1, "optionId": 1, "start": -1, "end": 1 }`
- `{ "sectionId": 1, "optionId": 1, "start": -1, "end": 1, "hasImage": 1 }`
- `{ "sectionId": 1, "optionId": 1, "start": -1, "end": 1, "contentType": 1 }`
- `{ "sectionId": 1, "optionId": 1, "start": -1, "end": 1, "hasImage": 1, "contentType": 1 }`

### Sorting
- `{ "start": -1, "_id": -1 }` (ID added by pagination)

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
