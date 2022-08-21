//conectando o banco de dados com o sequelize
const sequelize = require("sequelize")
const conection = new sequelize('guiaperguntas', 'root', '124551',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conection //exportando o banco de dados ja conectado