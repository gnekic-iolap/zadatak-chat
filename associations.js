import { Message } from './models/messages';
import { User } from './models/users';
import { Chatroom } from './models/chatrooms';

const ChatroomResolve = {
	users(obj) {
		return User.findALL({
			where: {
				chatroomId: obj.id
			}
		});
	},
	messages(obj) {
		return Message.findALL({
			where: {
				chatroomId:obj.id
			},
			order:[
				['createdAt', 'DESC']
			]
		});
	}
}




export { ChatroomResolve };