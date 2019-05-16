const Query = {
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
}

export { Query as default}