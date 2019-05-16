import { GraphQLServer } from 'graphql-yoga'
import db from './db';
import { resolvers } from './graphql/resolvers';

const server = new GraphQLServer({
  typeDefs:'./src/schema.graphql',
  resolvers,
  context: {
    db
  }
})

server.start( () => {
  console.log('The server is up!')
})

