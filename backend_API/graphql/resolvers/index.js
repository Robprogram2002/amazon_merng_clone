const userResolvers = require("../resolvers/userResolvers");
const productResolvers = require("../resolvers/productResolvers");

module.exports = {
  Query: {
    hello: () => {
      return "Hello from graphql";
    },
    ...userResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
  },
};
