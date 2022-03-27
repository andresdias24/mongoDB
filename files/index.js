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
            </tr>
        `;
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("divProduct").innerHTML = contenido;
}  