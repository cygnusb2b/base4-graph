const { join } = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');
const {
  RefOneDirective,
  RefManyDirective,
  ArrayValueDirective,
  MutateDirective,
} = require('./directives');

const typeDefs = importSchema(join(__dirname, 'definitions/index.graphql'));

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    refOne: RefOneDirective,
    refMany: RefManyDirective,
    arrayValue: ArrayValueDirective,
    mutate: MutateDirective,
  },
});
