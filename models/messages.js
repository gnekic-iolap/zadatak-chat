
import { User } from './users';
import { Chatroom } from './chatrooms';

export default (sequelize, DataTypes) => {
	const Message = sequelize.define('Message', {
		text: {
			type:DataTypes.STRING
		},
		chatroomId: {
			type:DataTypes.STRING
		},
		username: {
			type:DataTypes.STRING
		},
	});


return Message;

/*Message.belongsTo(User);
Message.belongsTo(Chatroom);
Chatroom.haMany(User);
Chatroom.haMany(Message);
User.belongsTo(Chatroom);
User.hasMany(Message);*/

	}