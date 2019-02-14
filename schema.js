import { gql } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export default gql`
	type User{
		id: Int!
		username: String!
		email: String!
		password: String!
	}
	type Query{
		allUsers: [User!]!
		getUser(id: Int!): User!
	}
	type Mutation {
    	register(username: String!, password: String!, email: String!): String!
    	login(username: String!, password: String): String!
    	updateUser(username: String, newUsername: String, password: String, newPassword: String): [Int!]!
    	deleteUser(id: Int!): Int!
	}
`;
