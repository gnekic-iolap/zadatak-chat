export default `
	type User{
		id: Int!
		username: String!
		email: String!
		password: String!
	}
	type Query{
		allUsers: [User!]!
		getUser(username: String!): User
	}
	type Mutation {
    	register(username: String!, password: String!, email: String!): User!
    	login(username: String!, password: String): String!
    	updateUser(username: String, newUsername: String, password: String, newPassword: String): [Int!]!
    	deleteUser(id: Int!): Int!
	}
`;
