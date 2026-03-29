/* =========================
   SISTEMA PORTAL ESCOLAR
   ========================= */

/* ========= USUARIOS ========= */

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    {user:"alumno1", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"alumno2", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"profesor1", pass:"1234", rol:"profesor", curso:"4A"},
    {user:"director", pass:"1234", rol:"admin"}
];

/* ========= DATOS ========= */

let notas = JSON.parse(localStorage.getItem("notas")) || [
    {alumno:"alumno1", asignatura:"Matemáticas", nota:6.5, fecha:"10-03-2026"},
    {alumno:"alumno1", asignatura:"Lenguaje", nota:5.8, fecha:"12-03-2026"},
    {alumno:"alumno2", asignatura:"Historia", nota:4.2, fecha:"11-03-2026"}
];

let tareas = JSON.parse(localStorage.getItem("tareas")) || [
    {curso:"4A", texto:"Guía Matemáticas"},
    {curso:"4A", texto:"Ensayo Historia"}
];

let pruebas = JSON.parse(localStorage.getItem("pruebas")) || [
    {curso:"4A", texto:"Prueba Lenguaje Viernes"},
    {curso:"4A", texto:"Prueba Ciencias Lunes"}
];

let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [
    {usuario:"alumno1", texto:"Estudiar para la prueba"},
    {usuario:"alumno2", texto:"Traer materiales"}
];

/* ========= LOGIN ========= */

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

        if(encontrado.rol === "alumno")
            window.location.href = "dashboard-alumno.html";

        if(encontrado.rol === "profesor")
            window.location.href = "dashboard-profesor.html";

        if(encontrado.rol === "admin")
            window.location.href = "dashboard-admin.html";

    }else{
        alert("Usuario incorrecto");
    }
}

/* ========= SEGURIDAD ========= */

function verificarRol(rolPermitido){

    let rol = localStorage.getItem("rol");

    if(rol !== rolPermitido){
        alert("Acceso no autorizado");
        window.location.href = "index.html";
    }
}

/* ========= NAVEGACION ========= */

function irNotas(){ window.location.href = "notas.html"; }
function irTareas(){ window.location.href = "tareas.html"; }
function irPruebas(){ window.location.href = "pruebas.html"; }
function irMensajes(){ window.location.href = "mensajes.html"; }
function volver(){ window.history.back(); }

/* ========= NOTAS ALUMNO ========= */

function cargarNotas(){

    let usuario = localStorage.getItem("usuario");
    let tabla = document.getElementById("tablaNotas");

    if(!tabla) return;

    tabla.innerHTML = "";
    let suma = 0;
    let cantidad = 0;

    notas.forEach(n => {

        if(n.alumno === usuario){

            let color = n.nota < 4 ? "red" : "black";

            tabla.innerHTML += `
            <tr>
                <td>${n.asignatura}</td>
                <td style="color:${color};font-weight:bold">${n.nota}</td>
                <td>${n.fecha}</td>
            </tr>
            `;

            suma += n.nota;
            cantidad++;
        }
    });

    if(cantidad > 0){
        let promedio = (suma/cantidad).toFixed(2);
        document.getElementById("promedio").innerHTML =
            "Promedio: " + promedio;
    }
}

/* ========= TAREAS ========= */

function cargarTareas(){

    let curso = localStorage.getItem("curso");
    let lista = document.getElementById("listaTareas");

    if(!lista) return;

    lista.innerHTML = "";

    tareas.forEach(t=>{
        if(t.curso === curso){
            lista.innerHTML += `<li>${t.texto}</li>`;
        }
    });
}

/* ========= PRUEBAS ========= */

function cargarPruebas(){

    let curso = localStorage.getItem("curso");
    let lista = document.getElementById("listaPruebas");

    if(!lista) return;

    lista.innerHTML = "";

    pruebas.forEach(p=>{
        if(p.curso === curso){
            lista.innerHTML += `<li>${p.texto}</li>`;
        }
    });
}

/* ========= MENSAJES ========= */

function cargarMensajes(){

    let usuario = localStorage.getItem("usuario");
    let lista = document.getElementById("listaMensajes");

    if(!lista) return;

    lista.innerHTML = "";

    mensajes.forEach(m=>{
        if(m.usuario === usuario){
            lista.innerHTML += `<li>${m.texto}</li>`;
        }
    });
}

/* ========= ADMIN USUARIOS ========= */

function cargarUsuarios(){

    verificarRol("admin");

    let lista = document.getElementById("listaUsuarios");
    if(!lista) return;

    lista.innerHTML = "";

    usuarios.forEach(u => {

        lista.innerHTML += `
        <li onclick="verUsuario('${u.user}')">
            ${u.user} - ${u.rol} - ${u.curso || "sin curso"}
        </li>
        `;
    });
}

function verUsuario(user){

    localStorage.setItem("usuarioSeleccionado", user);
    window.location.href = "ver-usuario.html";
}

/* ========= ADMIN VER NOTAS ========= */

function cargarNotasAdmin(){

    let usuario = localStorage.getItem("usuarioSeleccionado");
    let tabla = document.getElementById("tablaAdminNotas");

    if(!tabla) return;

    tabla.innerHTML = "";

    notas.forEach(n=>{

        if(n.alumno === usuario){

            tabla.innerHTML += `
            <tr>
                <td>${n.asignatura}</td>
                <td>${n.nota}</td>
                <td>${n.fecha}</td>
            </tr>
            `;
        }
    });
}

/* ========= GUARDAR DATOS ========= */

function guardarTodo(){

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("notas", JSON.stringify(notas));
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("pruebas", JSON.stringify(pruebas));
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
}

/* ========= INIT ========= */

window.onload = function(){

    if(document.getElementById("tablaNotas")) cargarNotas();
    if(document.getElementById("listaTareas")) cargarTareas();
    if(document.getElementById("listaPruebas")) cargarPruebas();
    if(document.getElementById("listaMensajes")) cargarMensajes();
    if(document.getElementById("listaUsuarios")) cargarUsuarios();
    if(document.getElementById("tablaAdminNotas")) cargarNotasAdmin();
};
