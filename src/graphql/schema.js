const { join } = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');
const {
  ArrayValueDirective,
  ContentHashDirective,
  ContentPathDirective,
  ContentQueryAllDirective,
  ContentQueryOneDirective,
  ContentRedirectToDirective,
  InflectDirective,
  MomentFormatDirective,
  MutatedValueDirective,
  PaginatedDirective,
  PassThruDirective,
  RefManyDirective,
  RefOneDirective,
  RelatedContentDirective,
  ScheduledSectionsDirective,
  ValueDirective,
} = require('./directives');

const typeDefs = importSchema(join(__dirname, 'definitions/index.graphql'));

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    arrayValue: ArrayValueDirective,
    contentPath: ContentPathDirective,
    contentHash: ContentHashDirective,
    contentQueryAll: ContentQueryAllDirective,
    contentQueryOne: ContentQueryOneDirective,
    contentRedirectTo: ContentRedirectToDirective,
    inflect: InflectDirective,
    momentFormat: MomentFormatDirective,
    mutatedValue: MutatedValueDirective,
    paginated: PaginatedDirective,
    passThru: PassThruDirective,
    refMany: RefManyDirective,
    refOne: RefOneDirective,
    relatedContent: RelatedContentDirective,
    scheduledSections: ScheduledSectionsDirective,
    value: ValueDirective,
  },
});
