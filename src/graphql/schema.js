const schema = `
  type Ingredient {
    id: ID!
    name: String!
    metrics: String!
    ccal: Int!
    fat: Int!
    carbon: Int!
    protein: Int!
  }

  type Recipe {
    id: ID!
    title: String!
    desc: String
    rules: String!
    author: User!
    content: [RecipeContent!]!
  }

  type RecipeContent {
    id: ID!
    ingredient: Ingredient!
    amount: Float!
    Recipe: Recipe!
  }

  type Menu {
    id: ID!
    date: String!
    author: User!
    content: [MenuContent!]!
  }

  type MenuContent {
    id: ID!
    recipes: [Recipe!]!
    for: User!
    type: String
    menu: ID!
  }

  type Storage {
    id: ID!
    author: User!
    date: String!
  }

  type StorageContent {
    id: ID!
    ingredient: Ingredient!
    amount: Float!
  }

  type ShoppingList {
    id: ID!
    author: User!
    date: String!
  }

  type ShoppingListContent {
    id: ID!
    ingredient: Ingredient!
    amount: Float!
  }

  type User {
    id: ID!
    name: String!
    email: String
    recipes: [Recipe!]!
  }

  type Query {
    ingredients: [Ingredient!]!
    recipes: [Recipe!]!
    users: [User!]!
    menu: [Menu!]!
  }

  input RecipeInputContent {
    ingredient: String!
    amount: Float!
  }

  input RecipeInput {
    title: String!
    desc: String
    rules: String!
    author: ID!
    content: [RecipeInputContent!]!
  }

  input IngredientInput {
    name: String!
    metrics: String!
    ccal: Int!
    fat: Int!
    carbon: Int!
    protein: Int!
  }

  input MenuContentInput {
    recipes: [ID!]!
    for: ID!
    type: String
  }

  input MenuInput {
    date: String!
    author: ID!
    content: [MenuContentInput!]!
  }

  type Mutation {
    createUser(name: String!, email: String): User!
    deleteUser(id: ID!): User!
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(id: ID!): Recipe!
    createIngredient(ingredientInput: IngredientInput): Ingredient!
    createMenu(menuInput: MenuInput): Menu!
    deleteMenu(id: ID!): Menu!
  }
`

export {schema as default}