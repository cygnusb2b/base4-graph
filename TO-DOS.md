## GraphQL Specific
There's a relatively large time savings by projecting only the fields requested.
For example, simply requesting ID will still return the entire content object, including the body (which can be VERY large).
Additionally, some objects contain the body multiple times (due to mutations).
In fact, the average content object size (on Officer) is 4k. Returning 10 documents (the default `first` value) would result in 40k (on average) being returned from the database, even if those fields are not requested.

## Indexes on Base4

Generally, `status` should be indexed, where applicable

**website.Section**
status + parent.$id
site.$id

**website.Schedule**
status + content.$id

**platform.Product**
status + site
