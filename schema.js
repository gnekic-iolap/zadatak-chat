import { gql } from 'apollo-server-express';

export default gql`

	type User {
		id: Int!
		username: String!
		email: String!
		password: String!
	}

	type Chatroom{
		id: Int!
		title: String
		users: [User]
		messages: [Message]
	}

	type Message {
		id: Int!
		text: String!
		chatroomId: String!
		username: String
		createdAt: String
	}

	type Query {
		allUsers: [User!]!
		getUser(username: String, id: Int): User!
		chatrooms: [Chatroom]
		chatroom(id:Int!):Chatroom
		messages(chatroomId:String): [Message]
		users(chatroomId:Int): [User]
		user(id:Int, search:String):User
	}

	type Mutation {
    	register(username: String!, password: String!, email: String!): String!
    	login(username: String!, password: String): String!
    	updateUser(username: String, newUsername: String, password: String, newPassword: String, token: String!): String
    	deleteUser(id: Int!): Int!
		addMessage(text: String!, token: String!, chatroomId: String!): Message

	}

	type Subscription {
		messageAdded(chatroomId: String): Message
	}

`;
