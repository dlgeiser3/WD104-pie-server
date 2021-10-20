require('dotenv').config();//1

const {Sequelize} = require('sequelize');//2

const db = new Sequelize(process.env.DB_CONNECTION_STRING); //3
// const db = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
//     host: 'localhost',
//     dialect: 'postgres'
// })
module.exports = db; //4