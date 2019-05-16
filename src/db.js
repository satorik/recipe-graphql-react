const users = [{
  id: '0',
  name: 'Naya',
  email: null
},
{
  id: '1',
  name: 'KIN',
  email: null
},
{
  id: '2',
  name: 'KSI',
  email: null
}]

const recipes = [{
  id: '0',
  title: 'First recipe',
  desc: null,
  rules: 'Get a pan. Fry a little',
  author: '0'
}, {
  id: '1',
  title: 'Second recipe',
  desc: 'this is the best recipe',
  rules: 'Chop some veggies',
  author: '0'
}]

const ingredients = [
  {
    id: '0',
    name: 'meat',
    metrics: 'kg',
    ccal: 120,
    fat: 5,
    carbon: 2,
    protein: 20,
  },
  {
    id: '1',
    name: 'salad',
    metrics: 'kg',
    ccal: 120,
    fat: 5,
    carbon: 2,
    protein: 20,
  },
  {
    id: '2',
    name: 'cheese',
    metrics: 'kg',
    ccal: 120,
    fat: 5,
    carbon: 2,
    protein: 20,
  },
  ]

const recipeContent = [{
    id: '0',
    ingredient: '0',
    amount: 5,
    recipe: '0'
  },{
    id: '1',
    ingredient: '1',
    amount: 2,
    recipe: '0'
  },{
    id: '2',
    ingredient: '2',
    amount: 6,
    recipe: '0'
  },{
    id: '3',
    ingredient: '1',
    amount: 10,
    recipe: '1'
  },{
    id: '4',
    ingredient: '0',
    amount: 15,
    recipe: '1'
  },{
    id: '5',
    ingredient: '2',
    amount: 1,
    recipe: '1'
  }]

const menu = [{
  id: '0',
  date: '2018-05-14',
  author: '0'
}]

const menuContent = [{
  id: '0',
  type: 'breakfast',
  recipes: ['0', '1'],
  for: '1',
  menu: '0'
},
{
  id: '1',
  type: 'lunch',
  recipes: ['1'],
  for: '1',
  menu: '0'
},
{
  id: '2',
  type: 'dinner',
  recipes:['1'],
  for: '1',
  menu: '0'
}]

const db = {
  users,
  recipes,
  ingredients,
  recipeContent,
  menu,
  menuContent
}

export {db as default}
