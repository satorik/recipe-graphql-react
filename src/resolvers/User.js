const User = {
  recipes(parent, args, {db}, info) {
    return db.recipes.filter((recipe) => {
      return recipe.author === parent.id
    })
  }
}

export {User as default}