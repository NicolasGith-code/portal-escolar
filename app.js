// ===============================
// USUARIOS DEL SISTEMA
// ===============================
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    {user:"alumno1", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"alumno2", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"profesor1", pass:"1234", rol:"profesor", curso:"4A"},
    {user:"director", pass:"1234", rol:"admin"}
];

// ===============================
// BASE DE DATOS DE NOTAS
// ===============================
const notas = [
    {alumno:"alumno1", asignatura:"Matemáticas", nota:6.5, fecha:"10-03-2026"},
    {alumno:"alumno1", asignatura:"Lenguaje", nota:5.8, fecha:"12-03-2026"},
    {alumno:"alumno1", asignatura:"Historia", nota:3.9, fecha:"15-03-2026"},
    {alumno:"alumno1", asignatura:"Ciencias", nota:6.9, fecha:"18-03-2026"},

    {alumno:"alumno2", asignatura:"Matemáticas", nota:5.5, fecha:"10-03-2026"},
    {alumno:"alumno2", asignatura:"Lenguaje", nota:6.1, fecha:"12-03-2026"}
];

// ===============================
// LOGIN
// ===============================
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
        alert("Usuario o contraseña incorrectos");
    }
}

// ===============================
// SEGURIDAD POR ROL
// ===============================
function verificarRol(rolPermitido){

    let rol = localStorage.getItem("rol");

    if(rol !== rolPermitido){
        alert("Acceso no autorizado");
        window.location.href = "index.html";
    }
}

// ===============================
// NAVEGACIÓN
// ===============================
function irNotas(){
    window.location.href = "notas.html";
}

function volver(){
    window.location.href = "dashboard-alumno.html";
}

// ===============================
// CARGAR NOTAS ALUMNO
// ===============================
function cargarNotas(){

    verificarRol("alumno");

    let usuario = localStorage.getItem("usuario");
    let tabla = document.getElementById("tablaNotas");

    if(!tabla) return;

    tabla.innerHTML = "";

    let suma = 0;
    let contador = 0;

    notas.forEach(n => {

        if(n.alumno === usuario){

            let color = n.nota < 4 ? "red" : "black";

            tabla.innerHTML += `
                <tr>
                    <td>${n.asignatura}</td>
                    <td style="color:${color}; font-weight:bold;">
                        ${n.nota}
                    </td>
                    <td>${n.fecha}</td>
                </tr>
            `;

            suma += n.nota;
            contador++;
        }
    });

    if(contador > 0){
        let promedio = (suma / contador).toFixed(2);
        document.getElementById("promedio").innerHTML =
            "Promedio General: " + promedio;
    }
}

// ===============================
// PANEL PROFESOR
// ===============================
function cargarCursoProfesor(){

    verificarRol("profesor");

    let curso = localStorage.getItem("curso");
    let lista = document.getElementById("listaAlumnos");

    if(!lista) return;

    lista.innerHTML = "";

    usuarios.forEach(u => {

        if(u.rol === "alumno" && u.curso === curso){

            lista.innerHTML += `
                <li>${u.user}</li>
            `;
        }
    });
}

// ===============================
// CONTROL AUTOMÁTICO
// ===============================
window.onload = function(){

    if(document.getElementById("tablaNotas")){
        cargarNotas();
    }

    if(document.getElementById("listaAlumnos")){
        cargarCursoProfesor();
    }

    if(document.getElementById("listaUsuarios")){
        cargarUsuarios();
    }

};

// ===============================
// CREAR USUARIOS
// ===============================

function crearUsuario(){

    verificarRol("admin");

    let user = document.getElementById("nuevoUser").value;
    let pass = document.getElementById("nuevoPass").value;
    let rol = document.getElementById("nuevoRol").value;
    let curso = document.getElementById("nuevoCurso").value;

    usuarios.push({
        user:user,
        pass:pass,
        rol:rol,
        curso:curso
    });

    // GUARDAR PERMANENTE
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario creado correctamente");

    cargarUsuarios();
}
