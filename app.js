
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
