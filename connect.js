import { ChatroomResolve } from './associations';
import { chatrooms, chatroom, users, messages } from './conncecting_all';

import { addMessage , messageAdded } from './add_message';
import { allUsers, getUser, updateUser, deleteUser, register, login } from './resolverss'

const resolvers = {
	Query: {
		chatrooms,
		chatroom,
		users,
		messages,
		allUsers,
		getUser,
	},
	Chatroom: ChatroomResolve,
	Mutation: {
		addMessage,
		updateUser,
		deleteUser,
		register,
		login
	},
	Subscription: {
		messageAdded
	}
};

export default resolvers;