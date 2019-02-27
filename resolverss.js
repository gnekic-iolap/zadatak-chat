
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

/*const real_time = 'real_time'

const messageAdded = subscribe;withFilter(
	() => pubsub.asyncIterator(real_time),
	(payload, args) => payload.chatroomId === args.chatroomId
	),
*/


//const getMessages = (parent, channelId, { models }) => { return models.Chatroom.findAll() };


const allUsers = (parent, args, { models }) => { return models.User.findAll() };
//const Messages = (parent, channelId, { models }) => { return models.Chatroom.findAll() };
const getUser = (parent , { username, id }, { models }) =>{
			if (username) {
				return models.User.findOne({where:{ username } }) }
			else if (id) {
				return models.User.findOne({where:{ id } }) }
		};
/*const createMessage = async (parent, { text, token }, { SECRET } ) => {
			const token_check = await jwt.verify(token, SECRET);
			var user_id = token_check.user.id;
  			return Message.create({
    			text: text,
    			user_id: user.id,
    			channel_Id: channel_Id})
    				.then(message => {
      					return message.dataValues;
    				})
    				.then(message => {
      					pubsub.publish('messageAdded', { messageAdded: message });
    				})
    				.catch(e => {
      					console.error(e);
    				})};*/

/*const addMessage = async (parent, { text, token, chatroomId}, { models,SECRET }) =>{
	const token_check = await.jwt.verify(token, SECRET);
	var user_id = token_check.User.id;
	return models.Message.create({
		text: text,
	    chatroomId: chatroomId,
	    user_id:user.id,
  })*/
		
const updateUser = async (parent, { username, newUsername, password, newPassword, token }, { models, SECRET }) =>{
			const token_check = await jwt.verify(token, SECRET);
			const user = await models.User.findOne({ where: { username } });
			if (user.id == token_check.user.id) {
				if (newUsername) {
					if (newUsername == await models.User.findOne({ where: { username } })) {
						throw new Error ('Username already taken');
					}
					return models.User.update({username : newUsername},
						{ where: { username } })
				}
				if (newPassword) {
					const valid = await bcrypt.compare(password, user.password);
					if(!valid){
						throw new Error ('Incorrect password');
					}
					const pass = await bcrypt.hash(newPassword, 12);
					return models.User.update({password : pass},
						{ where: { username } })
					}
				}
			else {
				throw new Error('Not autherbla')
				}
			};

const deleteUser = (parent , { id } , { models }) => {
			models.User.destroy({
				where: { id } })};

const register = async (parent, {username, password, email} ,{ models, SECRET}) =>{
			const user = {username, password, email}
			const check_username = await models.User.findOne({ where: {username} })
			const check_email = await models.User.findOne({ where: {email} })
			if (check_username != null) {
				return 'Username already taken';
			}

			else if (check_email != null) {
				return 'Email already exists';
			}
			
			user.password = await bcrypt.hash(user.password, 12);
			const user2 = await models.User.create(user);

		  const token = jwt.sign(
			{ user: _.pick(user2, ['id'])}, SECRET, {expiresIn: '1d' });
  
			return token;
		};

const login = async (parent, { username, password } ,{ models, SECRET }) => {
			const user = await models.User.findOne({ where: { username } });
			if (!user) {
				return ('There is no user with that username');
			}

			const valid = await bcrypt.compare(password, user.password);
			if(!valid){
				return ('Incorrect password');
			}

			const token = jwt.sign(
			{ user: _.pick(user, ['id'])}, SECRET, {expiresIn: '1d' });

			return token;
		};

export {allUsers, getUser, updateUser, deleteUser, register, login};
