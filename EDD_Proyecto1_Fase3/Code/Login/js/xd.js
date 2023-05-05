function Loginn() {
    let user = document.getElementById("useeer").value;
    let pass = document.getElementById("passsword").value;
    let ArbolenStorageLogin = JSON.parse(window.localStorage.getItem("TreeAVL"));
    let resultado = arbolBinarioAVL.VerificandoPasswordYCarnetDelArbol(ArbolenStorageLogin, user, pass);

    try {
        console.log("ArbolStorage: ", ArbolenStorageLogin);
        console.log("Resultado: ", resultado);

        if (user == "admin" && pass == "admin") {
            let ruta = "/EDD_Proyecto1_Fase2/Code/Dashboard/examples/dashboard.html";
            window.location.href = ruta;
            console.log(ruta);
            alert("Bienvenido Admin");
        } else if (resultado != false) {
            let usuariosArray = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtener array de usuarios del localStorage
            let usuarioIndex = usuariosArray.findIndex(usuario => usuario.carnet === resultado.carnet); // Buscar el índice del usuario en el array
            if (usuarioIndex === -1) { // Si el usuario no existe en el array, agregarlo
                usuariosArray.push(resultado);
            } else { // Si el usuario ya existe en el array, actualizarlo
                usuariosArray[usuarioIndex] = resultado;
            }
            console.log('ArraydeUsuarios: ', ArraydeUsuarios);
            console.log('usuarioActual: ', usuarioActual);

            localStorage.setItem('usuarios', JSON.stringify(usuariosArray)); // Guardar el array de usuarios en el localStorage
            localStorage.setItem('usuarioActual', JSON.stringify(resultado));
            let rutaa = "/EDD_Proyecto1_Fase2/Code/User/examples/user.html";
            console.log(rutaa);
            window.location.href = rutaa;
            alert("Bienvenido Estudiante: " + resultado.nombre);
        } else {
            alert("Usuario o contraseña incorrecta")
        }
    } catch (error) {
        alert(error)
    }
}


function actualizarUsuarioenArray() {
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    let usuariosArray = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el índice del usuario en el array
    let usuarioIndex = usuariosArray.findIndex(usuario => usuario.carnet === usuarioActual.carnet);

    // Si el usuario existe en el array, actualizarlo con la información actualizada del usuarioActual
    if (usuarioIndex !== -1) {
        usuariosArray[usuarioIndex] = usuarioActual;
    }

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosArray));
}



let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
let usuariosArray = JSON.parse(localStorage.getItem('usuarios')) || [];

// Buscar el índice del usuario en el array
let usuarioIndex = usuariosArray.findIndex(usuario => usuario.carnet === usuarioActual.carnet);

// Si el usuario existe en el array, actualizarlo con la información actualizada del usuarioActual
if (usuarioIndex !== -1) {
  usuariosArray[usuarioIndex] = usuarioActual;
}

// Guardar el array actualizado en el localStorage
localStorage.setItem('usuarios', JSON.stringify(usuariosArray));
