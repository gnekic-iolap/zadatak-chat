import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models/server';

const schema = makeExecutableSchema({ typeDefs, resolvers, });

const SECRET = process.env.JWT_SECRET;

const app = express();

const addUser = async (req) =>{
	const token = req.headers.authorization;
	try{
		const { user } = await jwt.verify(token, SECRET);
		req.user = user;
	}catch (err){
		console.log(err);
	}
	req.next();
};

app.use(cors('*'));
app.use(addUser);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress( req => ({ schema, context: {models, SECRET, user: req.user }})),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

const serverPort = (process.env.SERVER_PORT) ? parseInt(process.env.SERVER_PORT, 10) : 4000;
models.sequelize.sync().then(() => app.listen(serverPort));
