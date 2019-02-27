
export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username:{
			type:DataTypes.STRING,
			unique: true,
		},
		email:{
			type:DataTypes.STRING,
			unique: true,
		},
		password:{
			type:DataTypes.STRING,
		},
	});

		return User;
}

/*Message.belongsTo(User);
Message.belongsTo(Chatroom);
Chatroom.hashMany(Message);
User.belongsTo(Chatroom);
User.hashMany(Message);*/
