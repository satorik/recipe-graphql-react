import getUserId from '../utils/getUserId'

const Query = {
  recipes(parent, {query, ingId}, {prisma}, info) {
    const OR = []
    let opArgs = {}

    if (ingId) {
     const ingWhere = {recipeContent_some:{ingredient:{id: ingId}}}
    OR.push(ingWhere)
    }

    if (query) {
      const queryWhere = [{
          title_contains: query
        }, {
          desc_contains: query
        }] 
        OR.push(...queryWhere)
    }

    if( query || ingId) { opArgs = {where: {OR}}}

   return prisma.query.recipes(opArgs, info)
  },

  myRecipes(parent, args, {prisma, req}, info){
    const id = getUserId(req)

    return prisma.query.recipes({where:{author:{id}}}, info)
  },
  ingredients(parent, args, {prisma}, info) {
    return prisma.query.ingredients(null, info)
  },

  users(parent, args, {prisma}, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]

      }
    }

    return prisma.query.users(opArgs, info)
  },

  recipe(parent, {id}, {prisma, req}, info) {
    const userId = getUserId(req, false)

    //Check if recipes published or not (for later)

    // const recipes = await prisma.query.recipes({
    //   where: {
    //     id,
    //     OR: [
    //       {
    //         published: true
    //       }, {
    //         author: {id: userId}
    //       }]

    //   }
    // }, info)

    return prisma.query.recipe({where: {id}})
  },

  me(parent, args, {prisma, req}, info) {
    const id = getUserId(req)

    return prisma.query.user({where:{id}})
  }
}

export {Query as default}