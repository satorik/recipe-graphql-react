import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import token from '../utils/getToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async login(parent, {email, password}, {prisma}, info) {
    if (typeof email !== 'string' || password.length < 6) {
      throw new Error('Wrong credentials')
    }

    const user = await prisma.query.user({where:{email}})
    if (!user) {
      throw new Error('No User!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Wrong password')
    }

    return {user, token: token(user.id)}
  },
  async createUser(parent, {data}, {prisma}, info) {

    const password = await hashPassword(data.password)

    const user = await prisma.mutation.createUser({
        data: { 
          ...data,
          password
        }
      })
    
    return {user, token: token(user.id) }
  },

  async deleteUser(parent, args, {prisma}, info) {

    const id = getUserId(req)

    const user = await prisma.exists.User({id})
    if (!user) {
      throw new Error('No User!')
    }

    return await prisma.mutation.deleteUser({where: {id}}, info)

  },
  async updateUser(parent, {data}, {prisma, req}, info) {

    if (typeof data.password === 'string') {
      data.password = await hashPassword(data.password)
    }

    const id = getUserId(req)

    return prisma.mutation.updateUser({
      where: {id},
      data
    }, info)
  },

  createRecipe(parent, {data}, {prisma, req}, info) {
    const id = getUserId(req)

    const {recipeContent, ...recipeData} = data

    const recipeInputData = {
      author: {
        connect: {id}
      },
      ...recipeData,
      recipeContent: {
        create: recipeContent.map(content => {
          return {
            ingredient: {
              connect: {
                id: content.ingredient
              }
            },
            amount: content.amount
          }
        })
      }
    }

    return prisma.mutation.createRecipe({data: recipeInputData}, info)

  },

  async updateRecipe(parent, {id, data}, {prisma, req}, info) {
    const userId = getUserId(req)
    const recipeExists = await prisma.exists.Recipe({
      id,
      author: {
        id: userId
      }
    })

    if (!recipeExists) {
      throw new Error('No such recipe for this user')
    }

    return prisma.mutation.updateRecipe({
      where: {id},
      data
    }, info)

  },

  async updateRecipeContent(parent, {id, data}, {prisma, req}, info) {

    const userId = getUserId(req)
    const recipeExists = await prisma.exists.Recipe({
      author: {
        id: userId
      },
      recipeContent_some: {id}
    })

    if (!recipeExists) {
      throw new Error('No such recipe for this user')
    }
    //if ingredient id is not provided mutation fails. Add logic to update only amount

    return prisma.mutation.updateRecipeContent({
      where: {
        id: id
      },
      data: {
        ingredient: {
          connect: {
            id: data.ingredient
          }
        },
        amount: data.amount
      }
    }, info)

  },

  async createRecipeContent(parent, {id, data}, {prisma, req}, info) {

    const userId = getUserId(req)
    const recipeExists = await prisma.exists.Recipe({
      id,
      author: {
        id: userId
      }
    })

    if (!recipeExists) {
      throw new Error('No such recipe for this user')
    }

    return prisma.mutation.createRecipeContent({
      data: {
        ingredient: {
          connect: {
            id: data.ingredient
          }
        },
        amount: data.amount,
        recipe: {
          connect: {
            id: id
          }
        }
      }
    }, info)
  },

  async deleteRecipeContent(parent, {id}, {prisma, req}, info) {
    const userId = getUserId(req)
    const recipeExists = await prisma.exists.Recipe({
      author: {
        id: userId
      },
      recipeContent_some: {id}
    })

    if (!recipeExists) {
      throw new Error('No such recipe for this user')
    }

    return prisma.mutation.deleteRecipeContent({
      where: {
        id: id
      }
    }, info)

  },
  async deleteRecipe(parent, {id}, {prisma, req}, info) {

    const userId = getUserId(req)
    const recipeExists = await prisma.exists.Recipe({
      id,
      author: {
        id: userId
      }
    })

    if (!recipeExists) {
      throw new Error('No such recipe for this user')
    }

    return prisma.mutation.deleteRecipe({where: {id: id}}, info)

  },
  createIngredient(parent, {data}, {prisma, req}, info) {

    const id = getUserId(req)
    
    return prisma.mutation.createIngredient({data: data}, info)
  }
}

export {Mutation as default}