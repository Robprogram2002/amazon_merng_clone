const { gql } = require("apollo-server-express");

module.exports = gql`
  type ReturnUser {
    username: String!
    email: String!
    createdAt: String
    token: String
    imageUrl: String
  }

  type Query {
    hello: String!
    login(email: String, password: String!): ReturnUser!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): ReturnUser!
  }
`;
