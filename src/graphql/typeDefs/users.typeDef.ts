const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!, role: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    deleteUser(id: ID!): Boolean
  }
`;

export default userTypeDefs;
