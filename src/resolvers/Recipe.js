const Recipe = {
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
}

const RecipeContent = {
  ingredient(parent, args, {db}, info) {
    return db.ingredients.find((ingredient) => {
      return ingredient.id === parent.ingredient
    })
  }
}

export {Recipe, RecipeContent}