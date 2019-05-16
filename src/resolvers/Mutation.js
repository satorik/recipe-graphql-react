import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email)

    if (emailTaken) {
      throw new Error('Email taken')
    }

    const user = {
      id: uuidv4(),
      ...args.data
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
  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find((user) => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string'){
      const emailTaken = db.users.some(user => user.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    return user
  },
  createRecipe(parent, args, { db }, info) {
    const recipeInput = args.data
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
  updateRecipe(parent, { id, data }, { db }, info) {
    const recipe = db.recipes.find(recipe => recipe.id === id)

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    if (typeof data.title === 'string') {
      recipe.title = data.title
    }

    if (typeof data.desc === 'string') {
      recipe.desc = data.desc
    }
    
    if (typeof data.rules === 'string') {
      recipe.rules = data.rules
    }

    return recipe
  },
  updateRecipeContent(parent, { data }, { db }, info) {
    const newContentArray = []
    
    if (data.length > 0) {
      data.forEach(content => {
        const newContent = db.recipeContent.find( dbContent => content.id === dbContent.id)
        if (!newContent) {
          throw new Error('No Recipe content found')
        }
       // console.log(newContent)

        if (typeof content.ingredient !== 'undefined') {
          newContent.ingredient = content.ingredient
        }

        if (typeof content.amount === 'number') {
          newContent.amount = content.amount
        }
       // console.log(newContent)
        newContentArray.push(newContent)
      })
    }

    return newContentArray
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
    const ingredientInput = args.data
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
    const menuInput = args.data
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
}

export {Mutation as default}