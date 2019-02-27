import { Message } from './models/messages';
import { User } from './models/users';
import { Chatroom } from './models/chatrooms';

const chatrooms = (obj,args,context) => {
	return Chatroom.findAll();
};

const chatroom = (obj,args,context) =>{
	return Chatroom.findOne({
		where: {
			id:args.id
		}
	}).then(chatroom => chatroom.dataValues)
};

const users = (obj,args,context) =>{ 
	return 'chatroomId' in args ?
	User.findALL({
		where: {
			chatroomId: args.chatroomId
		}
	}):
	User.findALL();
};


const messages = (parent, { chatroomId }, { models })=>{
	return models.Message.findAll();
}

export { chatrooms, chatroom, users, messages };