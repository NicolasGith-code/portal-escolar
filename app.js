/* =========================
   PORTAL ESCOLAR - VERSION ESTABLE
   ========================= */

/* ========= CARGA SEGURA LOCALSTORAGE ========= */

function cargarStorage(nombre, defecto){
    let data = localStorage.getItem(nombre);
    return data ? JSON.parse(data) : defecto;
}

/* ========= DATOS ========= */

let usuarios = cargarStorage("usuarios",[
    {user:"alumno1", pass:"1234", rol:"alumno", curso:"4A"},
    {user:"profesor1", pass:"1234", rol:"profesor", curso:"4A"},
    {user:"director", pass:"1234", rol:"admin"}
]);

let notas = cargarStorage("notas",[
    {alumno:"alumno1", asignatura:"Matemáticas", nota:6.5, fecha:"10-03-2026"}
]);

let tareas = cargarStorage("tareas",[
    {curso:"4A", texto:"Guía Matemáticas"}
]);

let pruebas = cargarStorage("pruebas",[
    {curso:"4A", texto:"Prueba Lenguaje"}
]);

let mensajes = cargarStorage("mensajes",[
    {usuario:"alumno1", texto:"Estudiar para prueba"}
]);

/* ========= GUARDAR ========= */

function guardarTodo(){
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("notas", JSON.stringify(notas));
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("pruebas", JSON.stringify(pruebas));
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
}

/* ========= LOGIN ========= */

function login(){

    let usuario = document.getElementById("usuario")?.value;
    let password = document.getElementById("password")?.value;

    if(!usuario || !password){
        alert("Ingrese usuario y contraseña");
        return;
    }

    let encontrado = usuarios.find(u =>
        u.user === usuario && u.pass === password
    );

    if(!encontrado){
        alert("Usuario incorrecto");
        return;
    }

    localStorage.setItem("usuario", encontrado.user);
    localStorage.setItem("rol", encontrado.rol);
    localStorage.setItem("curso", encontrado.curso || "");

    if(encontrado.rol === "alumno")
        window.location.href = "dashboard-alumno.html";

    if(encontrado.rol === "profesor")
        window.location.href = "dashboard-profesor.html";

    if(encontrado.rol === "admin")
        window.location.href = "dashboard-admin.html";
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

function irNotas(){ window.location.href="notas.html"; }
function irTareas(){ window.location.href="tareas.html"; }
function irPruebas(){ window.location.href="pruebas.html"; }
function irMensajes(){ window.location.href="mensajes.html"; }
function volver(){ window.history.back(); }

/* ========= NOTAS ALUMNO ========= */

function cargarNotas(){

    let tabla = document.getElementById("tablaNotas");
    if(!tabla) return;

    let usuario = localStorage.getItem("usuario");

    tabla.innerHTML = "";

    let suma = 0;
    let cantidad = 0;

    notas.forEach(n=>{

        if(n.alumno === usuario){

            let color = n.nota < 4 ? "red" : "black";

            tabla.innerHTML += `
            <tr>
                <td>${n.asignatura}</td>
                <td style="color:${color};font-weight:bold">${n.nota}</td>
                <td>${n.fecha}</td>
            </tr>
            `;

            suma += parseFloat(n.nota);
            cantidad++;
        }
    });

    let prom = document.getElementById("promedio");
    if(prom && cantidad > 0){
        prom.innerHTML = "Promedio: " + (suma/cantidad).toFixed(2);
    }
}

/* ========= TAREAS ========= */

function cargarTareas(){

    let lista = document.getElementById("listaTareas");
    if(!lista) return;

    let curso = localStorage.getItem("curso");

    lista.innerHTML = "";

    tareas.forEach(t=>{
        if(t.curso === curso){
            lista.innerHTML += `<li>${t.texto}</li>`;
        }
    });
}

/* ========= PRUEBAS ========= */

function cargarPruebas(){

    let lista = document.getElementById("listaPruebas");
    if(!lista) return;

    let curso = localStorage.getItem("curso");

    lista.innerHTML = "";

    pruebas.forEach(p=>{
        if(p.curso === curso){
            lista.innerHTML += `<li>${p.texto}</li>`;
        }
    });
}

/* ========= MENSAJES ========= */

function cargarMensajes(){

    let lista = document.getElementById("listaMensajes");
    if(!lista) return;

    let usuario = localStorage.getItem("usuario");

    lista.innerHTML = "";

    mensajes.forEach(m=>{
        if(m.usuario === usuario){
            lista.innerHTML += `<li>${m.texto}</li>`;
        }
    });
}

/* ========= ADMIN USUARIOS ========= */

function cargarUsuarios(){

    let lista = document.getElementById("listaUsuarios");
    if(!lista) return;

    lista.innerHTML = "";

    usuarios.forEach(u=>{
        lista.innerHTML += `
        <li onclick="verUsuario('${u.user}')">
            ${u.user} - ${u.rol} - ${u.curso || "sin curso"}
        </li>`;
    });
}

function verUsuario(user){
    localStorage.setItem("usuarioSeleccionado", user);
    window.location.href="ver-usuario.html";
}

/* ========= ADMIN NOTAS ========= */

function cargarNotasAdmin(){

    let tabla = document.getElementById("tablaAdminNotas");
    if(!tabla) return;

    let usuario = localStorage.getItem("usuarioSeleccionado");

    tabla.innerHTML = "";

    notas.forEach(n=>{
        if(n.alumno === usuario){
            tabla.innerHTML += `
            <tr>
                <td>${n.asignatura}</td>
                <td>${n.nota}</td>
                <td>${n.fecha}</td>
            </tr>`;
        }
    });
}

/* ========= CREAR USUARIO ========= */

function crearUsuario(){

    verificarRol("admin");

    let user = document.getElementById("nuevoUser").value.trim();
    let pass = document.getElementById("nuevoPass").value.trim();
    let rol = document.getElementById("nuevoRol").value;
    let curso = document.getElementById("nuevoCurso").value.trim();

    if(!user || !pass){
        alert("Complete los campos");
        return;
    }

    if(usuarios.find(u=>u.user === user)){
        alert("Usuario ya existe");
        return;
    }

    usuarios.push({
        user:user,
        pass:pass,
        rol:rol,
        curso:curso
    });

    guardarTodo();
    cargarUsuarios();

    document.getElementById("nuevoUser").value="";
    document.getElementById("nuevoPass").value="";
    document.getElementById("nuevoCurso").value="";

    alert("Usuario creado");
}

/* ========= INIT ========= */

window.onload = function(){

    cargarNotas();
    cargarTareas();
    cargarPruebas();
    cargarMensajes();
    cargarUsuarios();
    cargarNotasAdmin();
};
