import {users, recipes, ingredients, recipeContent, menu, menuContent} from './data';
import uuidv4 from 'uuid/v4';


const resolvers = {
  Query: {
    recipes(parent, args, { db }, info) {
      return db.recipes
    },

    ingredients(parent, args, { db }, info) {
      return db.ingredients
    },

    users(parent, args, { db }, info) {
      return db.users
    },

    menu(parent, args, { db }, info) {
      return db.menu
    }
  },
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      const user = {
        id: uuidv4(),
        ...args
      }

      db.users.push(user)

      return user
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUsers = db.users.splice(userIndex, 1)

      db.recipes = db.recipes.filter(recipe => {
        const match = recipe.author === args.id

        if (match) {
          db.recipeContent = db.recipeContent.filter(content => content.recipe !== recipe.id)
        }

        return !match
      })
      
      db.menu = db.menu.filter(menuItem => {
        const match = menuItem.author === args.id

        if (match) {
          db.menuContent = db.menuContent.filter(content => content.menu !== menuItem.id)
        }

        return !match
      })

      return deletedUsers[0]
    },
    createRecipe(parent, args, { db }, info) {
      const recipeInput = args.recipeInput
      const userExist = db.users.some(user => user.id === recipeInput.author)

      if (!userExist) {
        throw new Error('User not found');
      }

      const recipe = {
        id: uuidv4(),
        title: recipeInput.title,
        desc: recipeInput.desc,
        rules: recipeInput.rules,
        author: recipeInput.author
      }

      //Check that ingredients exist!

      const newRecipeContent = recipeInput.content.map(content => {
        return {
          id: uuidv4(),
          ingredient: content.ingredient,
          amount: content.amount,
          recipe: recipe.id
        }
      })

      db.recipes.push(recipe)
      db.recipeContent.push(...newRecipeContent)

      return recipe
    },
    deleteRecipe(parent, args, {db}, info) {
      const recipeIndex = db.recipes.findIndex(recipe => recipe.id === args.id)

      if (recipeIndex === -1) {
        throw new Error('Reecipe not found')
      }   

      const deletedRecipes = db.recipes.splice(recipeIndex, 1)

      db.recipeContent = db.recipeContent.filter(content => content.recipe !== args.id)
      
      //delete recipe from the menu!
      // menu = menu.filter(menuItem => {
      //     menuContent = menuContent.filter(content => content.menu !== menuItem.id)

      //   return !match
      // })
      return deletedRecipes[0]
    },
    createIngredient(parent, args, { db }, info) {
      const ingredientInput = args.ingredientInput
      const ingredient = {
        id: uuidv4(),
        metrics: ingredientInput.metrics,
        ccal: ingredientInput.ccal,
        fat: ingredientInput.fat,
        carbon: ingredientInput.carbon,
        protein: ingredientInput.protein
      }

      db.ingredients.push(ingredient)
      return ingredient
    },
    createMenu(parent, args, {db}, info) {
      const menuInput = args.menuInput
      const userExist = db.users.some(user => user.id === menuInput.author)

      if (!userExist) {
        throw new Error('User not found');
      }

      const newMenu = {
        id: uuidv4(),
        date: menuInput.date,
        author: menuInput.author
      }

      //Check that recipes and for user exist!

      const newMenuContent = menuInput.content.map(content => {
        return {
          id: uuidv4(),
          type: content.type,
          recipes: content.recipes,
          for: content.for,
          menu: newMenu.id
        }
      })

      db.menu.push(newMenu)
      db.menuContent.push(...newMenuContent)

      return newMenu
    }
  },

  Recipe: {
    author(parent, args, {db}, info) {
      return db.users.find((user) => {
        return user.id === parent.author
      })
    },
    content(parent, args, {db}, info) {
      return db.recipeContent.filter((content) => {
        return content.recipe === parent.id
      })
    }
  },
  User: {
    recipes(parent, args, {db}, info) {
      return db.recipes.filter((recipe) => {
        return recipe.author === parent.id
      })
    }
  },
  RecipeContent: {
    ingredient(parent, args, {db}, info) {
      return db.ingredients.find((ingredient) => {
        return ingredient.id === parent.ingredient
      })
    }
  },
  MenuContent: {
    recipes(parent, args, {db}, info) {
      return db.recipes.filter(recipe => {
        return parent.recipes.find(newRecipe => {
          return recipe.id === newRecipe
        })
      })
    },
    for(parent, args, { db }, info) {
      return db.users.find((user) => {
        return user.id === parent.for
      })
    }
  },
  Menu: {
    author(parent, args, {db}, info) {
      return db.users.find((user) => {
        return user.id === parent.author
      })
    },
    content(parent, args, {db}, info) {
      return db.menuContent.filter((content) => {
        return content.menu === parent.id
      })
    }
  }
}

export {resolvers}
