function actualizarUsuarioenArray() {
  let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar el índice del usuario en el array
  let usuarioIndex = usuariosArray.findIndex(
    (usuario) => usuario.carnet === usuarioActual.carnet
  );

  // Si el usuario existe en el array, actualizarlo con la información actualizada del usuarioActual
  if (usuarioIndex !== -1) {
    usuariosArray[usuarioIndex] = usuarioActual;
  }

  // Guardar el array actualizado en el localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
  console.log("Usuarios: ", usuariosArray);
}

function cerrarSesion() {
  let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioIndex = usuariosArray.findIndex(
    (usuario) => usuario.carnet === usuarioActual.carnet
  );
  usuariosArray[usuarioIndex] = usuarioActual;
  localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
  localStorage.removeItem("usuarioActual");
  window.location.href = "../../Login/index.html"; // redirigir a la página de login
}

function referenciaUsuarioActual() {
  let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || {};

  // Buscar el objeto correspondiente en el array de usuarios
  let usuarioReferencia = usuariosArray.find(
    (usuario) => usuario.carnet === usuarioActual.carnet
  );

  return usuarioReferencia;
}

function getUsuarioActualFromLocalStorage() {
  let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  if (usuarioActual) {
    let usuariosArray = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosArray) {
      let usuarioIndex = usuariosArray.findIndex(
        (usuario) => usuario.carnet === usuarioActual.carnet
      );
      if (usuarioIndex !== -1) {
        return usuariosArray[usuarioIndex];
      }
    }
  }
  return null;
}

//  clase ARBONARIO GRAFIcar

// grafica_arbol(raiz) {
//     var cadena = "";
//     if (!(raiz === null)) {
//         cadena = "digraph arbol{ ";
//         cadena = cadena + this.retornarValoresArbol(raiz);
//         cadena = cadena + "}";
//     } else {
//         cadena = "digraph G { arbol }";
//     }
//     console.log(cadena)
//     return cadena;
// }

/** le mando el parametro primero y solo recorre los siguientes*/
// retornarValoresArbol(raiz) {
//     var cadena = "node[shape=folder ,fontsize=\"10pt\",penwidth=2,fontname=\"Courier New\",style=\"filled\",fillcolor=\"lightslateblue\",fontcolor=\"whitesmoke\"] ";
//     let nodo = 1;
//     let nodo_padre = 0;
//     cadena += "nodo" + nodo_padre + "[label=\"" + raiz.valor + "\"] "
//     cadena += this.valoresSiguietes(raiz.primero, nodo, nodo_padre)
//     cadena += this.conexionRamas(raiz.primero, 0)
//     return cadena;
// }

// valoresSiguietes(raiz, nodo, nodo_padre) {
//     let cadena = ""
//     let aux = raiz
//     let nodo_padre_aumento = nodo_padre
//     if (aux !== null) {
//         while (aux) {
//             cadena += "nodo" + aux.id + "[label=\"" + aux.valor + "\"] "
//             aux = aux.siguiente
//         }
//         aux = raiz
//         while (aux) {
//             nodo_padre_aumento++
//             cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
//             aux = aux.siguiente
//         }
//     }
//     return cadena
// }

// conexionRamas(raiz, padre) {
//     let cadena = ""
//     let aux = raiz
//     if (aux !== null) {
//         while (aux) {
//             cadena += "nodo" + padre + " -> nodo" + aux.id + " "
//             aux = aux.siguiente
//         }
//         aux = raiz
//         while (aux) {
//             cadena += this.conexionRamas(aux.primero, aux.id)
//             aux = aux.siguiente
//         }
//     }
//     return cadena
// }




