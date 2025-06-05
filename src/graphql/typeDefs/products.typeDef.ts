const productTypeDefs = `#graphql
  type Product {
    id: ID!
    productName: String!
    description: String
    price: Float!
    stock: Int!
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(productName: String!, description: String, price: Float!, stock: Int!): Product!
    deleteProduct(id: ID!): Boolean
  }
`;

export default productTypeDefs;
