import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs:'src/generated/prisma.graphql',
  endpoint: process.env.GRAPHQL_ENDPOINT,
  secret: process.env.PRISMA_SECRET
})

export { prisma as default }