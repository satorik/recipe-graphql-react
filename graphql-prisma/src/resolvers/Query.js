import getUserId from '../utils/getUserId'

const Query = {
  recipes(parent, {query, ingId, first, skip, after, orderBy}, {prisma}, info) {
    const OR = []
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    }

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

    if( query || ingId) { opArgs.where = {OR}}

   return prisma.query.recipes(opArgs, info)
  },

  myRecipes(parent, {first, skip, after, orderBy}, {prisma, req}, info){
    const id = getUserId(req)

    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {author: {id}}
    }

    return prisma.query.recipes(opArgs, info)
  },
  ingredients(parent, {first, skip, after, orderBy}, {prisma}, info) {

    const opArgs = {
      first,
      skip,
      after,
      orderBy
    }

    return prisma.query.ingredients(opArgs, info)
  },

  users(parent, {query, first, skip, after, orderBy}, {prisma}, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    }

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
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