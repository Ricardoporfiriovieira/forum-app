const { Sequelize } = require("sequelize")
const sequelize = require("sequelize")
const conection = require("./database")

//criando coluna de pergunta e resposta no banco de dados   
const pergunta = conection.define('perguntas',{ 
    titulo:{
        type: sequelize.STRING,
        allowNull: false  
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
    
})

//sincroniza as colunas criadas com o banco de dados e também evita que a tabela seja recriada
//caso já exista
pergunta.sync({force:false}).then(()=>{
    
})

module.exports = pergunta