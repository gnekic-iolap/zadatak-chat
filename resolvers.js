import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default{
	Query: {
		allUsers: (parent, args, { models }) =>  {
			return models.User.findAll()
		},
		getUser: (parent , { username }, { models , user }) =>{
			if (user) {
				"logged in"
			}
			else{
				"not logged in user"
			}
			console.log(user);
			return models.User.findOne({where:{ username } })
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

		register: async (parent, {username, password, email} ,{ models }) =>{
			const SECRET = 'safadgjh7834hurqwur82147fsdsfagji3435dfc';
			const user = {username, password, email}
			if (user.username == await models.User.findOne({ where: { username } }))
				throw new Error ('username already taken');
			if (user.email == await models.User.findOne({ where: { email } }))
				throw new Error ('email already exists');
			user.password = await bcrypt.hash(user.password, 12)

			user.jwt = jwt.sign(
			{ user: _.pick(user, ['id'])}, SECRET, {expiresIn: '1m' });

			models.User.create({username : user.username}, {password : user.password}, {email : user.email})

			return user.jwt
		},

		login: async (parent,  {username, password} ,{ models, SECRET }) => {
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