const User = {
  recipes(parent, args, {prisma}, info) {
    const opArgs = {}

    return prisma.query.recipes(opArgs, info)
  }
}

export {User as default}