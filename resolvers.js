import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default{
	Query: {
		allUsers: (parent, args, { models }) => models.User.findAll(),
		getUser: (parent , { id }, { models }) =>{
		
			return models.User.findOne({where:{ id } })
	},
},

	Mutation: {

		updateUser: async (parent, { username, newUsername, password, newPassword}, { models }) =>{
			const user = await models.User.findOne({ where: { username } });
			if (newUsername) {
				if (newUsername == await models.User.findOne({ where: { username } }))
					throw new Error ('username already taken');
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
		},

		deleteUser: (parent , { id } , { models }) =>
			models.User.destroy({
				where: { id } }),

		register: async (parent, {username, password, email} ,{ models,SECRET}) =>{
			const user = {username, password, email}
			if (user.username == await models.User.findOne({ where: { username } }))
				throw new Error ('username already taken');
			if (user.email == await models.User.findOne({ where: { email } }))
				throw new Error ('email already exists');
			user.password = await bcrypt.hash(user.password, 12)
			const user2 = await models.User.create(user);

		    const token = jwt.sign(
			{ user: _.pick(user2, ['id'])}, SECRET, {expiresIn: '1m' });

			return token
		},

		login: async (parent, {username, password} ,{ models, SECRET }) => {
			const user = await models.User.findOne({ where: { username } });
			if (!user) {
				throw new Error ('there is no user with that username');
			}

			const valid = await bcrypt.compare(password, user.password);
			if(!valid){
				throw new Error ('Incorrect password');
			}

			const token = jwt.sign(
			{ user: _.pick(user, ['id'])}, SECRET, {expiresIn: '3s' });

			return token;

		},
	},
};