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
    createdAt: String
    departmentId: ID!
  }

  type Subcategory {
    name: String
    id: String
  }

  type Category {
    title: String!
    image: String!
    subcategories: [Subcategory!]
    createdAt: String
    departmentId: ID!
    categoryId: ID!
  }

  type Location {
    country: String!
    state: String!
    city: String!
    address: String!
    code: String!
  }

  input InputLocation {
    country: String!
    state: String!
    city: String!
    address: String!
    code: String!
  }

  input InputContact {
    email: String
    phone: String
    facebook: String
    website: String
    tweeter: String
  }

  type Contact {
    email: String
    phone: String
    facebook: String
    website: String
    tweeter: String
  }

  input SubcategoryInput {
    name: String!
    id: String!
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
    rating: Float!
    comments: [SellerComments!]
    sellerId: ID!
  }

  type Product {
    sellerId: ID!
    departmentId: ID!
    categoryId: ID!
    subcategoryId: String
    title: String!
    description: String!
    images: [String!]!
    price: Float!
    stock: Int!
    brand: String!
    caracteristicas: [String!]!
    prime: Boolean!
    comments: [ID!]
    discount: Float
    rating: Float!
    questions: [ID!]
    freesend: Boolean!
    createdAt: String
    productId: ID!
  }

  type Query {
    hello: String!
    getUser(id: String!): ReturnUser!
    getDepartments(departmentId: ID): [Department!]!
    getCategories(categoryId: ID): [Category!]!
    getProducts(
      departmentId: ID
      categoryId: ID
      subcategoryId: ID
      productId: ID
    ): [Product!]!
    getSellers(sellerId: ID): [Seller!]!
  }

  type Mutation {
    login(email: String, password: String!, type: String): ReturnUser!

    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): ReturnUser!

    addDepartment(title: String!, images: [String!]!): Department!

    addCategory(
      departmentId: ID!
      title: String!
      subcategories: [SubcategoryInput!]
      image: String!
    ): Category!

    addSeller(
      userId: ID!
      companyName: String!
      companyImage: String!
      location: InputLocation!
      description: String!
      images: [String!]
      contacts: InputContact
    ): Seller!

    addProduct(
      sellerId: ID!
      departmentId: ID!
      categoryId: ID!
      subcategoryId: String
      title: String!
      description: String!
      images: [String!]
      price: Float!
      stock: Int!
      brand: String!
      caracteristicas: [String!]!
      prime: Boolean!
      discount: Float
    ): Product!
  }
`;
