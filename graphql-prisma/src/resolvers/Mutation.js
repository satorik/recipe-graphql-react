import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Mutation = {
  async createUser(parent, {data}, {prisma}, info) {
    if (data.password.length < 6) {
      throw new Error('Password must be 6 characters or longer')
    }

    const password = await bcrypt.hash(data.password, 12)

    return prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    }, info)
  },

  async deleteUser(parent, {id}, {prisma}, info) {

    const user = await prisma.exists.User({id})
    if (!user) {
      throw new Error('No User!')
    }

    return prisma.mutation.deleteUser({where: {id}}, info)

  },
  async updateUser(parent, {id, data}, {prisma}, info) {

    return prisma.mutation.updateUser({
      where: {id},
      data
    }, info)
  },

  createRecipe(parent, {data}, {prisma}, info) {
    const {recipeContent, author, ...recipeData} = data

    const recipeInputData = {
      author: {
        connect: {
          id: author
        }
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

  updateRecipe(parent, {id, data}, {prisma}, info) {

    return prisma.mutation.updateRecipe({
      where: {
        id: id
      },
      data: data
    }, info)

  },

  updateRecipeContent(parent, {id, data}, {prisma}, info) {

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

  createRecipeContent(parent, {id, data}, {prisma}, info) {

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

  deleteRecipeContent(parent, {id}, {prisma}, info) {

    return prisma.mutation.deleteRecipeContent({
      where: {
        id: id
      }
    }, info)

  },
  deleteRecipe(parent, {id}, {prisma}, info) {

    return prisma.mutation.deleteRecipe({where: {id: id}}, info)

  },
  createIngredient(parent, {data}, {prisma}, info) {
    return prisma.mutation.createIngredient({data: data}, info)
  }
}

export {Mutation as default}