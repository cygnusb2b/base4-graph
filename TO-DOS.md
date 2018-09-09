## GraphQL Specific
There's a relatively large time savings by projecting only the fields requested.
For example, simply requesting ID will still return the entire content object, including the body (which can be VERY large).
Additionally, some objects contain the body multiple times (due to mutations).
In fact, the average content object size (on Officer) is 4k. Returning 10 documents (the default `first` value) would result in 40k (on average) being returned from the database, even if those fields are not requested.

## Indexes on Base4

Generally, `status` should be indexed, where applicable

## Notes on Sorting and Collation
- Sorting by a field that does _not_ have an index will cause slow queries.
- Sorting by a field that _does_ have an index but does _not_ match the collation (`en_US`) value will cause slow queries.
- As such, indexing every field of the model's Graph sort enum will be required (with the correct collation, where applicable).
- Only string fields need collation. Dates, IDs, numbers, etc likely don't. We will need to find a way to effectively manage these sort types when querying.

_Note_: GraphQL sort pagination also uses the `_id` in addition to the sort field. For example, when sorting by name, the actual index needed would be `{ name: 1, _id: 1 }`

**platform.Content**
status+type
mutations.Website.primarySection.$id
company

**website.Section**
status + parent.$id
site.$id

**website.Schedule**
status + content.$id

**platform.Product**
status + site
