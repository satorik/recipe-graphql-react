const Query = {
  recipes(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          desc_contains: args.query
        }]
        
      }
    }
    return prisma.query.recipes(opArgs, info)
  },

  ingredients(parent, args, { prisma }, info) {
    return prisma.query.ingredients(null, info)
  },

  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
        
      }
    }

    return prisma.query.users(opArgs, info)
  }
}

export { Query as default}