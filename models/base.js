import Sequelize from 'sequelize';
import Chatroom from './chatrooms';
import User from './users';
import Message from './messages';
require('dotenv').config()


const sequelize = new Sequelize(
	 process.env.DB,
	 process.env.DB_USER,
	 process.env.DB_PASS,
	 {
		host : process.env.DB_HOST,
		dialect : process.env.DB_DIALECT
	 }

);

const db = {};

/*Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});*/

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*Message.belongsTo(User);
Message.belongsTo(Chatroom);
Chatroom.haMany(User);
Chatroom.haMany(Message);
User.belongsTo(Chatroom);
User.hasMany(Message);*/

db.User = User(sequelize, Sequelize);
db.Chatroom = Chatroom(sequelize, Sequelize);
db.Message = Message(sequelize, Sequelize);

export default db;