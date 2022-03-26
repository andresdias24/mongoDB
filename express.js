var express = require("express")

var app = express()

var path = require("path")

app.use("/css", express.static("./node_modeles/boostrap/dist/css"))


app.get("/", (req, res) => [
    res.sendFile(path.join(__dirname, "pages/persona.html"))
])

app.listen("9000", () => {
    console.log("servidor iniciado");
})

