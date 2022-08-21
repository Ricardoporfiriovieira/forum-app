//chamando e iniciando o express
const express = require("express");
const app = express();
//chamando o body-parser para capturar os dados dos inputs
const bodyParser = require("body-parser");
//conectando o node com o banco de dados
const conection = require("./database/database")
// importando a coluna de pergunta
const pergunta = require("./database/Pergunta")
// importando a coluna de resposta
const resposta = require("./database/Resposta")


//Database

conection
    .authenticate()
    .then(()=>{
        console.log("Conexão com Banco de dados realizada com sucesso!")
    })
    .catch((msgerro)=>{
        console.log(msgerro)
    })

//dizendo para o express usar o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static('public'))
//usando BodyParser para capturar dados enviados pelo formulario (npm install body-parser --save)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rotas
app.get("/", (req, res)=>{
    //DESC = decrescente, ASC = CRESCENTE
    pergunta.findAll({raw:true, order:[
        ['id', 'DESC' ]
    ]}).then((pergunta)=>{
        res.render("index",{
            pergunta: pergunta
        })
    })

    
})

app.get("/perguntar",(req, res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    pergunta.create({
        titulo: titulo,
        descricao: descricao     
    }).then(()=>{
        res.redirect("/")
    })

})

app.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then((pergunta)=>{
        if(pergunta){
            resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then((resposta)=>{
                res.render("pergunta",
                {   
                    pergunta: pergunta,
                    resposta: resposta
                }
                )
            })  
        }else{
            res.render("index")
        }
    })
})

app.post('/responder', (req, res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    })
})

app.listen(4000, (erro)=>{
    if(erro){
        console.log(erro);
    }else{
        console.log("Rodando aplicação");
    }
})