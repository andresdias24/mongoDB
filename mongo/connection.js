const mongoose  = require("mongoose");
var url = "mongodb://localhost:27018/personas";
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;


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
    edad: Number,
    birthday: String
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
    getFindId(req, res) {
        let id = req.params.id;
        console.log("😆👽🕳👨‍💻 🧬 ~ file: connection.js ~ line 66 ~ id", id)
        Personas.aggregate([ {$match: {_id: ObjectId(`${id}`)}},
        {
            $project: {
                _id: 1, nombre: 1, apellido: 1, edad: 1, birthday: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$fechaDeNacimiento"
                    }
                }}
            }
        ]).then(data => {
            res.json(data);
        }).catch(err => {
            res.end(err);
        });
    }
    
}

module.exports = new productController();