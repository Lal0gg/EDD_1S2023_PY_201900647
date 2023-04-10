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







//====================================================================================================

  // BuscarCarpeta(carpeta_nueva, lista_carpeta, raiz) {
    //     //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
    //     if (lista_carpeta[1] === "" && raiz.primero !== null) {
    //         let aux = raiz.primero;
    //         while (aux) {
    //             if (aux.valor === carpeta_nueva) {
    //                 return 1;
    //             }
    //             aux = aux.siguiente;
    //         }
    //         return 2;
    //     }
    //     //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
    //     else if (lista_carpeta[1] === "" && raiz.primero === null) {
    //         return 5;
    //     }
    //     //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
    //     else if (lista_carpeta[1] !== "" && raiz.primero === null) {
    //         return 3;
    //     }
    //     //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
    //     else if (lista_carpeta[1] !== "" && raiz.primero !== null) {
    //         let aux = raiz.primero;
    //         let nivel = lista_carpeta.length;
    //         let posicion = 1;
    //         for (var i = 1; i < nivel; i++) {
    //             if (aux !== null) {
    //                 while (aux) {
    //                     if (
    //                         posicion < lista_carpeta.length &&
    //                         lista_carpeta[posicion] === aux.valor
    //                     ) {
    //                         posicion++;
    //                         if (aux.primero !== null && posicion < lista_carpeta.length) {
    //                             aux = aux.primero;
    //                         }
    //                         break;
    //                     } else {
    //                         aux = aux.siguiente;
    //                     }
    //                 }
    //             } else {
    //                 break;
    //             }
    //         }
    //         if (aux !== null) {
    //             aux = aux.primero;
    //             while (aux) {
    //                 if (aux.valor === carpeta_nueva) {
    //                     return 1;
    //                 }
    //                 aux = aux.siguiente;
    //             }
    //             return 2;
    //         } else {
    //             return 4;
    //         }
    //     }
    // }
    




    // insertarHijos(carpeta_nueva, lista_carpeta, raiz) {
    //     /**
    //      * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
    //      */
    //     const nuevoNodo = new nodoArbolN(carpeta_nueva, this.nodo_creados);
    //     this.nodo_creados++;
    //     //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
    //     if (lista_carpeta[1] === "" && raiz.primero === null) {
    //         raiz.primero = nuevoNodo;
    //     }
    //     //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
    //     else if (lista_carpeta[1] === "" && raiz.primero !== null) {
    //         raiz = this.insertarOrdenado(raiz, nuevoNodo);
    //     }
    //     //Corroboramos si la insercion es en algun directorio que no es la raiz
    //     else if (lista_carpeta[1] !== "" && raiz.primero !== null) {
    //         let aux = raiz.primero;
    //         let nivel = lista_carpeta.length;
    //         let posicion = 1;
    //         //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
    //         for (var i = 1; i < nivel; i++) {
    //             if (aux !== null) {
    //                 while (aux) {
    //                     //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
    //                     if (
    //                         posicion < lista_carpeta.length &&
    //                         lista_carpeta[posicion] === aux.valor
    //                     ) {
    //                         posicion++;
    //                         //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
    //                         if (aux.primero !== null && posicion < lista_carpeta.length) {
    //                             aux = aux.primero;
    //                         }
    //                         break;
    //                     } else {
    //                         aux = aux.siguiente;
    //                     }
    //                 }
    //             } else {
    //                 break;
    //             }
    //         }
    //         //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
    //         if (aux.primero === null) {
    //             aux.primero = nuevoNodo;
    //         } else {
    //             aux = this.insertarOrdenado(aux, nuevoNodo);
    //         }
    //     }
    // }