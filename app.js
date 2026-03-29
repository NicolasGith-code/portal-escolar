const usuarios = [
    {user:"alumno1", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"alumno2", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"profesor1", pass:"1234", rol:"profesor", curso:"4A"},
    {user:"director", pass:"1234", rol:"admin"}
];
function login(){

    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    let encontrado = usuarios.find(u => 
        u.user === usuario && u.pass === password
    );

    if(encontrado){

        localStorage.setItem("usuario", encontrado.user);
        localStorage.setItem("rol", encontrado.rol);
        localStorage.setItem("curso", encontrado.curso);

        if(encontrado.rol === "alumno"){
            window.location.href = "dashboard-alumno.html";
        }

        if(encontrado.rol === "profesor"){
            window.location.href = "dashboard-profesor.html";
        }

        if(encontrado.rol === "admin"){
            window.location.href = "dashboard-admin.html";
        }

    }else{
        alert("Usuario incorrecto");
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
        {asignatura: "Historia", nota: 3.9, fecha: "15-03-2026"},
        {asignatura: "Ciencias", nota: 6.9, fecha: "18-03-2026"}
    ];

    let tabla = document.getElementById("tablaNotas");
    let suma = 0;

    notas.forEach(nota => {

        let color = nota.nota < 4.0 ? "red" : "black";

        let fila = `
            <tr>
                <td>${nota.asignatura}</td>
                <td style="color:${color}; font-weight:bold;">
                    ${nota.nota}
                </td>
                <td>${nota.fecha}</td>
            </tr>
        `;

        tabla.innerHTML += fila;
        suma += nota.nota;
    });

    let promedio = (suma / notas.length).toFixed(2);

    document.getElementById("promedio").innerHTML =
        "Promedio General: " + promedio;
}

window.onload = function(){
    if(document.getElementById("tablaNotas")){
        cargarNotas();
    }
}
