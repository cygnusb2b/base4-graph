const { join } = require('path');
const { makeExecutableSchema, SchemaDirectiveVisitor } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');
const Base4 = require('../base4');
const formatStatus = require('../utils/format-graph-status');

const typeDefs = importSchema(join(__dirname, 'definitions/index.graphql'));

class RefOneDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { base4 }) => {
      const {
        model,
        localField,
        foreignField,
        criteria,
      } = this.args;

      const ref = doc[localField || field.name];
      const id = Base4.extractRefId(ref);
      if (!id) return null;

      let query = {
        ...criteria,
        [foreignField]: id,
      };

      if (input) {
        const { status } = input;
        if (status) query = { ...query, ...formatStatus(status) };
      }
      const { namespace, resource } = Base4.parseModelName(model);
      const collection = await base4.collection(namespace, resource);
      return collection.findOne(query);
    };
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    refOne: RefOneDirective,
  },
});
