import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs:'src/generated/prisma.graphql',
  endpoint: process.env.GRAPHQL_ENDPOINT,
  secret: process.env.PRISMA_SECRET
})

export { prisma as default }

// const createRecipeForUser = async (authorId, recipeData, contentData) => {
//   const rerecipe = await prisma.mutation.createRecipe({
//     data: {
//       ...recipeData,
//       author: {
//         connect: {
//           id: authorId
//         }
//       },
//       recipeContent: {
//         create: contentData
//       }
//     }
//   },'{ id }')

//   const user = await prisma.query.users({where: {id: authorId}}, '{ id name recipes {title id} }')

//   return user
// }

// const recipeData = {
//   title:'New Delic recipe',
//   desc:'Basic desc',
//   rules: 'Do not forget to stir'
// }

// const contentData = [{
//     ingredient:{connect:{id:"cjvrr9c22002h0747omr8tdcc"}},
//     amount:2
//   }, {
//     ingredient:{connect:{id:"cjvrr9wih002m0747gqpaas7h"}},
//     amount:1
//   },{
//     ingredient:{connect:{id:"cjvrrack7002r0747rgymbj5v"}},
//     amount:10
//   }]

//createRecipeForUser('cjvrqnrem001t0747iqocq437', recipeData, contentData)
//.then(data => console.log(JSON.stringify(data, undefined, 2)))



// prisma.query.users(null, '{ id name recipes {title id} }')
// .then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// })
// .catch(err => {
//   console.log(err)
// })

// prisma.query.recipes(null, '{id title recipeContent {ingredient {name} amount } }')
// .then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// })
// .catch(err => {
//   console.log(err)
// })

//prisma.mutation.createRecipe()