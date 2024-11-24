// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('exampleapp', 'root', 'Lolinha1!',
//   { host: "localhost", dialect: 'mysql' })

// //Posts
// const Post = sequelize.define('posts', {
//   title: { type: Sequelize.STRING },
//   content: { type: Sequelize.TEXT },
// })

// //Users
// const Users = sequelize.define('users', {
//   nome: { type: Sequelize.STRING },
//   sobrenome: { type: Sequelize.STRING },
//   idade: { type: Sequelize.INTEGER },
//   email: { type: Sequelize.STRING },
// })

//Inserts
// Post.create({
//   title: "Teste post",
//   content: "Teste conteúdo legal"
// })
// Users.create({
//   nome: "Erika",
//   sobrenome: "Rafaesky",
//   idade: 23,
//   email: "erikarafaeskyti@gmail.com"
// })

//Force delete before create;
// Users.sync({ force: true })
// Post.sync({ force: true })
// sequelize.authenticate().then(function () {
//   console.log("Connected!")
// }).catch(function (error) {
//   console.log("Error: " + error)
// })