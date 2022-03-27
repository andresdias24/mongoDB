const mongoose  = require("mongoose");
var url = "mongodb://localhost:27018/personas";
var Schema = mongoose.Schema;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) {
        console.log(err);
    }else {
    console.log("conectado a la base de datos");
    }
});

var objeto = new Schema({
    nombre: String,
    apellido: String,
    edad: Number
}, {collection: "personas"});

var Personas = mongoose.model("personas", objeto);

class productController {
    listar(req, res) {
        Personas.aggregate([
            {
                $project: {
                    _id: 1, nombre: 1, apellido: 1, edad: 1,
                    nombreCompleto: {$concat: ["$nombre", " ", "$apellido"]}
                }
            }
        ]).then(data => {
            res.json(data);
        });
    }
    crear(req, res) {
        var nuevo = new Productos(req.body);
        nuevo.save((err, data) => {
            if (err) {
                console.log(err);
            }else {
                res.json(data);
            }
        });
    }
    editar(req, res) {
        Productos.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                console.log(err);
            }else {
                res.json(data);
            }
        });
    }
    eliminar(req, res) {
        Productos.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
            }else {
                res.json(data);
            }
        });
    }
}

module.exports = new productController();