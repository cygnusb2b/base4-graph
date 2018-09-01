const { join } = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');
const {
  RefOneDirective,
  RefManyDirective,
  ArrayValueDirective,
  ValueDirective,
  MutatedValueDirective,
  PassThruDirective,
} = require('./directives');

const typeDefs = importSchema(join(__dirname, 'definitions/index.graphql'));

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    refOne: RefOneDirective,
    refMany: RefManyDirective,
    arrayValue: ArrayValueDirective,
    value: ValueDirective,
    mutatedValue: MutatedValueDirective,
    passThru: PassThruDirective,
  },
});
