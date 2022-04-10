window.onload = function () {
    fetch("/listarUnProducto").then(function (res) {
        res.json().then(function (json) {
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
                <td>${data.nombreCompleto}</td> 
                <td>${data.apellido}</td>
                <td>${data.edad}</td>
                <td>
                <button onclick="verFormulario('${data._id}')"> Editar </button>
                <button onclick="eliminar('${data._id}')"> Eliminar </button>
                </td>
            </tr>
        `;
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("divProduct").innerHTML = contenido;
}  


function verFormulario(id) {
    console.log("🕳👨‍💻 🧬 ~ file: index.js ~ line 47 ~ id", id)
    document.getElementById("idFormulario").style.display = "block";

    if(id != null){
        fetch("/recuperarInformacion/"+id).then(function (res) {
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

function ocultarFormularion() {
    document.getElementById("idFormulario").style.display = "none";
}