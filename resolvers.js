import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default{
	Query: {
		allUsers: (parent, args, { models }) => models.User.findAll(),
		getUser: (parent , { username }, { models , user }) =>{
			if (user) {
				"logged in"
			}
			else{
				"not logged in user"
			}
			consoloe.log(user);
			return models.User.findOne({where:{ username } })
	},
},

	Mutation: {

		updateUser:(parent, { username, newUsername }, { models }) =>
			models.User.update({  username: newUsername },
				{ where : { username } }),

		deleteUser: (parent , { id } , { models }) =>
			models.User.destroy({
				where: { id } }),

		register: async (parent, {username, password, email} ,{ models }) =>{
			const user = await models.User.findOne({ where: { username } });
			if (user) {
				throw new Error ('username already taken');
			}
			const mail = await models.User.findOne({ where: { email } });
			if (mail) {
				throw new Error (' email already exists');
			}
			user.password = await bcrypt.hash(user.password, 12);
			return models.User.create(user);

			const token = jwt.sign(
			{ user: _.pick(user, ['id']),}, SECRET, {expiresIn: '1m' });
			return token;
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
			{ user: _.pick(user, ['id']),}, SECRET, {expiresIn: '1m' });
			return token;

		},
	},
};