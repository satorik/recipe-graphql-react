const Recipe = {
  author(parent, args, { prisma }, info) {
    const opArgs = {}
    opArgs.where = {
      id: parent.author.id
    }
    console.log(opArgs);
    return prisma.query.users(opArgs, info)
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