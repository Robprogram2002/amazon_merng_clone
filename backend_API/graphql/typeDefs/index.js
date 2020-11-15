const { gql } = require("apollo-server-express");

module.exports = gql`
  type ReturnUser {
    userId: ID!
    username: String!
    email: String!
    createdAt: String
    token: String
    imageUrl: String
    type: String
  }

  type Department {
    title: String!
    images: [String!]!
    categories: [ID!]
  }

  type Subcategory {
    name: String
    id: String
  }

  type Category {
    title: String!
    image: String!
    subcategories: [Subcategory!]
  }

  type Location {
    country: String!
    state: String!
    city: String!
    address: String!
    code: String!
  }

  type Contact {
    email: String
    phone: String
    facebook: String
    website: String
    tweeter: String
  }

  type SellerComments {
    description: String!
    date: String!
    owner: ID!
    likes: [ID!]
  }

  type Seller {
    userId: ID!
    companyName: String!
    companyImage: String!
    location: Location!
    description: String!
    images: [String!]
    contacts: Contact
    products: [ID!]
    rating: Number!
    comments: [SellerComments!]
  }

  type Product {
    seller: ID!
    departmentId: ID!
    categoryId: ID!
    subcategoryId: String
    title: String!
    description: String!
    images: [String!]
    price: Number!
    stock: Number!
    brand: String!
    caracteristicas: [String!]!
    prime: Boolean!
    comments: [ID!]
    discount: Number
    rating: Number!
    questions: [ID!]
    freesend: Boolean!
    prime: Boolean
  }

  type Query {
    hello: String!
    getUser(id: String!): ReturnUser!
  }

  type Mutation {
    login(email: String, password: String!, type: String): ReturnUser!

    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): ReturnUser!

    addDepartment(
      title: String!
      images: [String!]!
      categories: [ID!]
    ): Department!

    addCategory(
      title: String!
      subcategories: [String!]
      image: String!
    ): Category!

    addSeller(
      userId: ID!
      companyName: String!
      companyImage: String!
      location: Location!
      description: String!
      images: [String!]
      contacts: Contact
    ): Seller!

    addProduct(
      seller: ID!
      departmentId: ID!
      categoryId: ID!
      subcategoryId: String
      title: String!
      description: String!
      images: [String!]
      price: Number!
      stock: Number!
      brand: String!
      caracteristicas: [String!]!
      prime: Boolean!
    ): Product!
  }
`;
