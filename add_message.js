import { Message } from './models/messages';
import { User } from './models/users';
import jwt from 'jsonwebtoken';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const one = '1'

/*
// KRIVO
const messageAdded = (parent, args, models) => {
  console.log(parent, args, models);
  console.log('CALLED!!!');
  const asyncIterator = pubsub.asyncIterator(one);
  return asyncIterator
};
*/

// DOBRO
const messageAdded = {
  resolve: (payload, args, context, info) => {
    // console.log(payload);
    return payload.messageAdded;
  },
  subscribe: () => pubsub.asyncIterator(one),
};

const addMessage = async (parent, { text, chatroomId, token }, { models, SECRET }) =>{
  const token_check = await jwt.verify(token, SECRET);
  const user_Id = token_check.user.id
  const user = await models.User.findOne({ where: {id: user_Id } });

  const message = await models.Message.create({
    text: text,
    chatroomId: chatroomId,
    username: user.username
  })
    .then((data) => JSON.parse(JSON.stringify(data)))
    .catch((error) => {
      console.log('ERROR WHILE CREATING NEW TEXT MESSAGE');
      return {};
    });

  pubsub.publish(one, { messageAdded: message });
  return message;
}

export { addMessage, pubsub, messageAdded };