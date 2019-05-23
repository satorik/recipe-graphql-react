import { extractFragmentReplacements } from 'prisma-binding'

import Query from './Query'
import Mutation from './Mutation'
import User from './User'
import {Recipe, RecipeContent} from './Recipe'
import {Menu, MenuContent} from './Menu'
import Subscription from './Subscription'

const resolvers = {
  Query,
  Mutation,
  User,
 // Recipe,
 // RecipeContent,
 // Menu,
 // MenuContent,
  Subscription
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export {resolvers, fragmentReplacements}