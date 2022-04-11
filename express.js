var express = require("express")

var app = express()

var path = require("path")
var bodyParser = require("body-parser")

var cn = require("./mongo/connection.js")
app.use("/css", express.static(path.join(__dirname, "css")))
app.use("/files", express.static(path.join(__dirname, "files")))
app.use(bodyParser.json())
app.get("/listarUnProducto", (req, res) => {
    cn.listar(req, res)
})

app.get("/recuperarInformacion/:id",(req,res)=>{    
    cn.getFindId(req,res)
})  //recuperarInformacion))

app.put("/eliminarPersona/:id",(req,res)=>{    
    cn.deleteId(req,res)
})  //recuperarInformacion))

app.post("/insertarPersona", (req, res) => {
    cn.insertPerson(req, res)
})

app.post("/actualizarPersona", (req, res) => {
    cn.updatePerson(req, res)
})

app.get("/", (req, res) => [
    res.sendFile(path.join(__dirname, "pages/persons.html"))
])

app.listen("9000", () => {
    console.log("servidor iniciado");
})

