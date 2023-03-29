function Loginn() {
    let user, password;
    user = document.getElementById("useeer").value;
    password = document.getElementById("passsword").value;
    if (user == "admin" && password == "admin") {
        alert("Bienvenido al sistema");
        windows.location = "Code/Login/Dashboard/examples/dashboard.html";
        console.log("Bienvenido al sistema");
    } else {
        alert("Usuario o contraseña incorrectos :( ");
    }
}
