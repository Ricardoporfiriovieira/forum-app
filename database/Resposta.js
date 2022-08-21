const { Sequelize } = require("sequelize")
const sequelize = require("sequelize")
const conection = require("./database")

const resposta = conection.define('respostas', {
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull: false
    }
})

resposta.sync({force:false}).then(()=>{

})

module.exports = resposta