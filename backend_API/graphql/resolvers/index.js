const userResolvers = require("../resolvers/userResolvers");

module.exports = {
  Query: {
    hello: () => {
      return "Hello from graphql";
    },
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
