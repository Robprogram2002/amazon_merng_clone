const { gql } = require("apollo-server-express");

module.exports = gql`
  type ReturnUser {
    userId: ID!
    username: String!
    email: String!
    createdAt: String
    token: String
    imageUrl: String
  }

  type Query {
    hello: String!
    getUser(id: String!): ReturnUser!
  }

  type Mutation {
    login(email: String, password: String!): ReturnUser!

    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): ReturnUser!
  }
`;
