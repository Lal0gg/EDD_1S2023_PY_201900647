
function Loginn() {
   
    var user = document.getElementById("useeer").value;
			var pass = document.getElementById("passsword").value;
			if(user == "admin" && pass == "admin"){
				location.href = "../Dashboard/examples/dashboard.html";
				alert("Bienvenido");
			}else{
				alert("Usuario o contraseña incorrectos");
			}
}
