var express = require("express")
var http = require("http")
var mysql = require("mysql")
var app = express()

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja"
});

try{
    if(conn.state != "authenticated"){
        conn.connect(function(erro){
            if(erro){
                console.log(erro)
            }
        })
    }
}catch(error){
    console.log(error)
}

app.get("/", (req, res) => {
    res.status(200).send("Bem-vindo(a) à nossa API REST")
})

app.get("/produto", (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    var sql = 'SELECT * FROM produto ORDER BY nome'
    conn.query(sql, function(err, result, fields){
        if(err){
            res.send('{"resposta" : "Erro ao executar a consulta}')
        }else{
            res.send(JSON.stringify(result))
        }
    })
})

http.createServer(app).listen(8001, ()=>{
    console.log("Servidor iniciado")
})