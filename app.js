
function login() {
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    // Login de prueba
    if(usuario === "alumno" && password === "1234"){
        window.location.href = "dashboard-alumno.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
function irNotas(){
    window.location.href = "notas.html";
}

function volver(){
    window.location.href = "dashboard-alumno.html";
}

function cargarNotas(){
    const notas = [
        {asignatura: "Matemáticas", nota: 6.5, fecha: "10-03-2026"},
        {asignatura: "Lenguaje", nota: 5.8, fecha: "12-03-2026"},
        {asignatura: "Historia", nota: 6.2, fecha: "15-03-2026"},
        {asignatura: "Ciencias", nota: 6.9, fecha: "18-03-2026"}
    ];

    let tabla = document.getElementById("tablaNotas");

    notas.forEach(nota => {
        let fila = `
            <tr>
                <td>${nota.asignatura}</td>
                <td>${nota.nota}</td>
                <td>${nota.fecha}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

window.onload = function(){
    if(document.getElementById("tablaNotas")){
        cargarNotas();
    }
}
