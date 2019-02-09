export default `
	type User{
		id: Int!
		username: String!
		email: String!
		password: String!
	}
	type Query{
		allUsers: [User!]!
		getUser(username:String!): User!
	}
	type Mutation {
    	createUser(username: String!, password: String!, email: String!): User
    	updateUser(username: String!, newUsername: String!): [Int!]!
    	deleteUser(username: String!): Int!
	}
`;
