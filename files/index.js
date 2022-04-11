window.onload = function () {
    listProducto()
};

function listProducto() {
    fetch("/listarUnProducto").then(res => {
        res.json().then(json => {
            listarUnProducto(json);
        }
        )
    })
}


function listarUnProducto(res) {
    var contenido = `
        <table class= 'table'>
            <thead>
                <tr>    
                    <th>ID</th>
                    <th>nombre completo</th>
                    <th>apellido</th>
                    <th>edad</th>
                    <th>Operaciones</th>
                </tr>
            </thead>
    `;
    contenido += "<tbody>";
    var data;
    for (var i = 0; i < res.length; i++) {
        data = res[i];
        contenido += `
            <tr>
                <th>${data._id}</th> 
                <td>${data.nombre}</td> 
                <td>${data.apellido}</td>
                <td>${data.edad}</td>
                <td>
                <button onclick="verFormulario('${data._id}')"> Editar </button>
                <button onclick="deleteRegister('${data._id}')"> Eliminar </button>
                </td>
            </tr>
        `;
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("divProduct").innerHTML = contenido;
}


function verFormulario(id) {
    cleanForm()
    console.log("🕳👨‍💻 🧬 ~ file: index.js ~ line 47 ~ id", id)
    document.getElementById("idFormulario").style.display = "block";

    if (id != null) {
        fetch("/recuperarInformacion/" + id).then(function (res) {
            res.json().then(json => {
                let data = json[0];
                document.getElementById("id").value = data._id;
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("apellido").value = data.apellido;
                document.getElementById("edad").value = data.edad;
            })
        }).catch(function (err) {
            console.log(err);
        })
    }
}

function cleanForm() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
}

function ocultarFormularion() {
    document.getElementById("idFormulario").style.display = "none";
}

function deleteRegister(id) {
    if (confirm("¿Esta seguro de eliminar el registro?") == 1) {
        fetch("/eliminarPersona/"+id, {
            method: "PUT"
        }).then(function (res) {
            res.json().then(rpta => {
                if (rpta.estado == "eliminado") {
                    alert("Registro eliminado");
                    listProducto();
                } else {
                    alert("Error al eliminar", err);
                }
            })
        }).catch(function (err) {
            console.log(err);
        })
    }
}

function enviarFormulario() {
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    if(id=="") {
        ruta="/insertPerson";
    } else {
        ruta = "/actualizarPersona";
    }

    fetch(ruta, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            apellido: apellido,
            edad: edad
        })
    }).then(res => {
        alert("Registro actualizado");
    }).catch(err => {
       alert("Error al actualizar");
    })

}