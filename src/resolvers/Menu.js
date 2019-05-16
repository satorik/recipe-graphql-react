const Menu = {
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

const MenuContent = {
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
}

export {Menu, MenuContent}