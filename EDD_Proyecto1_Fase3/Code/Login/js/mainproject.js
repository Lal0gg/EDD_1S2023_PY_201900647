// variables para la tabla de la carga masiva

let StudentsPermisos = [];
let PermisosxD = [];
let CarnetsDeHash = []

let table = document.getElementById("tablecarga");
let table2 = document.getElementById("tablArchivos");
let table3 = document.getElementById("tableReport");
let table4 = document.getElementById("tablaPermisos");
let tabla5 = document.getElementById("tablaPermisos2");

let encabezado = document.createElement("thead");
let encabezado2 = document.createElement("thead");
let encabezado3 = document.createElement("thead");
let encabezado4 = document.createElement("thead");
let encabezado5 = document.createElement("thead");





encabezado.classList.add("text-primary");
encabezado2.classList.add("text-primary");
encabezado3.classList.add("text-primary");
encabezado4.classList.add("text-primary");
encabezado5.classList.add("text-primary");

encabezado.innerHTML = `
    <th>Nombre</th> 
    <th>Carnet</th>
    <th>Contraseña</th>
    <th>Carpeta Raiz</th>
    `;

encabezado2.innerHTML = `
<th></th>
<th>Nombre Archivo</th>`;

encabezado3.innerHTML = `
    <th>Nombre</th> 
    <th>Carnet</th>
    <th>Contraseña</th>
    `;

encabezado4.innerHTML = `
    <th>Propietario</th> 
    <th>Destino</th>
    <th>Ubicacion</th>
    <th>Nombre Archivo</th>
    <th>Tipo Permiso</th>
    `;

encabezado5.innerHTML = `
    <th>Propietario</th> 
    <th>Destino</th>
    <th>Ubicacion</th>
    <th>Nombre Archivo</th>
    <th>Tipo Permiso</th>
    `;

let h4444 = document.getElementById("welcomeeeee");


/*             Meotods para la encriptacion                  */
const clave = 'clave-secreta'
const buffer = new ArrayBuffer(16)
const view = new Uint8Array(buffer)
for (let i = 0; i < clave.length; i++) {
    view[i] = clave.charCodeAt(i)
}
/** Guardar la variable view y guardar algoritmos*/
const iv = crypto.getRandomValues(new Uint8Array(16))
const algoritmo = { name: 'AES-GCM', iv: iv }

async function encriptacion(mensaje) {
    const enconder = new TextEncoder()
    const data = enconder.encode(mensaje)

    const claveCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['encrypt'])

    const mensajeCifrado = await crypto.subtle.encrypt(algoritmo, claveCrypto, data)

    const cifradoBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(mensajeCifrado)))

    return cifradoBase64;
}

async function desencriptacion(mensaje) {
    const mensajeCifrado = new Uint8Array(atob(mensaje).split('').map(char => char.charCodeAt(0)))

    const claveCrypto = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['decrypt'])

    const mensajeDescifrado = await crypto.subtle.decrypt(algoritmo, claveCrypto, mensajeCifrado)

    const decoder = new TextDecoder()
    const mensajeOriginal = decoder.decode(mensajeDescifrado)

    return mensajeOriginal
}

/* bloques para los mensajes */

class nodoBloque {
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash) {
        this.valor = {
            'index': index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

class Bloque {
    constructor() {
        this.inicio = null
        this.bloques_creados = 0
    }

    async insertarBloque(fecha, emisor, receptor, mensaje) {
        if (this.inicio === null) {
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha, emisor, receptor, mensajeEncriptado, '0000', hash)
            this.inicio = nuevoBloque
            this.bloques_creados++
        } else {
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let aux = this.inicio
            while (aux.siguiente) {
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha, emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            nuevoBloque.anterior = aux
            aux.siguiente = nuevoBloque
            this.bloques_creados++
        }
    }

    async sha256(mensaje) {
        let cadenaFinal
        const enconder = new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
            .then(result => { // 100 -> 6a 
                const hashArray = Array.from(new Uint8Array(result))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                cadenaFinal = hashHex
            })
            .catch(error => console.log(error))
        return cadenaFinal
    }
}





/*Clase de usuario de tipo estudiante */
class user_student {
    constructor(nombregg, carnetgg, passwordgg, carpetaRaizgg) {
        this.nombre = nombregg;
        this.carnet = carnetgg;
        this.password = passwordgg;
        this.carpeta_raiz = carpetaRaizgg;
        this.arbolNario = new ArbolNArio();
        this.listaCircular = new ListaCircularSimple();
    }
}

class user_student_hash {
    constructor(carnet, nombre, password, carpetaRaizgg, arbolNario, listaCircular) {
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpeta_raiz = carpetaRaizgg;
        this.arbolNario = arbolNario;
        this.listaCircular = listaCircular
    }
}

class permisos {
    constructor(carnetPropetario, carnetDestino, ubicacion, nombreArchivo, tipoPermiso, Archivoenbase64) {
        this.carnetPropetario = carnetPropetario;
        this.carnetDestino = carnetDestino;
        this.ubicacion = ubicacion;
        this.nombreArchivo = nombreArchivo;
        this.tipoPermiso = tipoPermiso;
        this.Archivoenbase64 = Archivoenbase64;
    }
}

class Permisoxd {
    constructor(nombre, contenido) {
        this.nombre = nombre;
        this.contenido = contenido;
    }
}

/* Nodo del arbol AVL */
class nodoArbol {
    constructor(user_student) {
        this.izquierdo = null;
        this.derecho = null;
        this.user_student = user_student;
        this.altura = 1;
        this.factor_equilibrio = 0;
    }
}

/*Clase del Arbol AVL */
class ArbolAVL {
    constructor() {
        this.raiz = null;
    }

    Altura(raiz) {
        return raiz === null ? 0 : raiz.altura;
    }

    Equilibrio(raiz) {
        return raiz === null
            ? 0
            : this.Altura(raiz.derecho) - this.Altura(raiz.izquierdo);
    }

    RotacionI(raiz) {
        let raiz_derecho = raiz.derecho;
        let hijo_izquierdo = raiz_derecho.izquierdo;
        raiz_derecho.izquierdo = raiz;
        raiz.derecho = hijo_izquierdo;
        raiz.altura =
            1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho));
        raiz_derecho.altura =
            1 +
            Math.max(
                this.Altura(raiz_derecho.izquierdo),
                this.Altura(raiz_derecho.derecho)
            );
        raiz.factor_equilibrio = this.Equilibrio(raiz);
        raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho);
        return raiz_derecho;
    }

    RotacionD(raiz) {
        let raiz_izquierdo = raiz.izquierdo;
        let hijo_derecho = raiz_izquierdo.derecho;
        raiz_izquierdo.derecho = raiz;
        raiz.izquierdo = hijo_derecho;
        raiz.altura =
            1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho));
        raiz_izquierdo.altura =
            1 +
            Math.max(
                this.Altura(raiz_izquierdo.izquierdo),
                this.Altura(raiz_izquierdo.derecho)
            );
        raiz.factor_equilibrio = this.Equilibrio(raiz);
        raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo);
        return raiz_izquierdo;
    }

    insertarValorHijo(nodo, raiz) {
        if (raiz === null) {
            raiz = nodo;
        } else {
            if (raiz.user_student.carnet === nodo.user_student.carnet) {
                raiz.user_student.carnet = nodo.user_student.carnet;
            } else if (raiz.user_student.carnet < nodo.user_student.carnet) {
                raiz.derecho = this.insertarValorHijo(nodo, raiz.derecho);
            } else {
                raiz.izquierdo = this.insertarValorHijo(nodo, raiz.izquierdo);
            }
        }
        raiz.altura =
            1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho));
        let balanceo = this.Equilibrio(raiz);
        raiz.factor_equilibrio = balanceo;
        //Rotacion Simple a la Izquierda
        if (
            balanceo > 1 &&
            nodo.user_student.carnet > raiz.derecho.user_student.carnet
        ) {
            return this.RotacionI(raiz);
        }
        //Rotacion Simple a la Derecha
        if (
            balanceo < -1 &&
            nodo.user_student.carnet < raiz.izquierdo.user_student.carnet
        ) {
            return this.RotacionD(raiz);
        }
        //Rotacion Doble a la Izquierda
        if (
            balanceo > 1 &&
            nodo.user_student.carnet < raiz.derecho.user_student.carnet
        ) {
            raiz.derecho = this.RotacionD(raiz.derecho);
            return this.RotacionI(raiz);
        }
        //Rotacion Doble a la Derecha
        if (
            balanceo < -1 &&
            nodo.user_student.carnet > raiz.izquierdo.user_student.carnet
        ) {
            raiz.izquierdo = this.RotacionI(raiz.izquierdo);
            return this.RotacionD(raiz);
        }
        return raiz;
    }

    PreOrdenAVL(raiz) {
        if (raiz !== null) {
            console.log(raiz.user_student);
            this.PreOrdenAVL(raiz.izquierdo);
            this.PreOrdenAVL(raiz.derecho);
        }
    }

    PostOrdenAVL(raiz) {
        if (raiz !== null) {
            this.PostOrdenAVL(raiz.izquierdo);
            this.PostOrdenAVL(raiz.derecho);
            console.log(raiz.user_student);
        }
    }

    InOrderAVL(raiz) {
        if (raiz != null) {
            this.InOrderAVL(raiz.izquierdo);
            console.log(raiz.user_student);
            this.InOrderAVL(raiz.derecho);
        }
    }

    insertaValor(user_student) {
        const nuevoNodo = new nodoArbol(user_student);
        this.raiz = this.insertarValorHijo(nuevoNodo, this.raiz);
    }

    grafica_arbol(raiz) {
        var cadena = "";
        if (!(raiz === null)) {
            cadena = "digraph arbol{ \n";
            cadena +=
                'node[shape=ellipse,fixedsize=true,width=1,height=1,fontsize="5.5",penwidth=2,fontname="Courier New",style="filled",fillcolor="deeppink",fontcolor="darkolivegreen1"]; \n';
            cadena = cadena + this.retornarValoresArbol(raiz, 0);
            cadena = cadena + "}";
        } else {
            cadena = "No hay valores en el arbol";
        }
        console.log(cadena);
        return cadena;
    }

    retornarValoresArbol(raiz, id) {
        var cadena = "";
        var numero = id + 1;
        console.log("La raiz", raiz);
        if (!(raiz === null)) {
            cadena += '"';
            cadena +=
                raiz.user_student.nombre +
                " \\n" +
                raiz.user_student.carnet +
                " \\n" +
                "Altura: " +
                raiz.altura;
            cadena += '" ;\n';
            if (!(raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + ' [label="",width=.1,style="invis"];\n';
                cadena += '"';
                cadena +=
                    raiz.user_student.nombre +
                    " \\n" +
                    raiz.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.altura;
                cadena += '" -> ';
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero);
                cadena += '"';
                cadena +=
                    raiz.user_student.nombre +
                    " \\n" +
                    raiz.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.altura;
                cadena += '" -> ';
                cadena += this.retornarValoresArbol(raiz.derecho, numero);
                cadena +=
                    "{rank=same" +
                    '"' +
                    raiz.izquierdo.user_student.nombre +
                    " \\n" +
                    raiz.izquierdo.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.izquierdo.altura +
                    '"' +
                    " -> " +
                    '"' +
                    raiz.derecho.user_student.nombre +
                    " \\n" +
                    raiz.derecho.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.derecho.altura +
                    '"' +
                    ' [style="invis"]};\n ';
            } else if (!(raiz.izquierdo === null) && raiz.derecho === null) {
                cadena += " x" + numero + ' [label="",width=.1,style="invis"];\\n';
                cadena += '"';
                cadena +=
                    raiz.user_student.nombre +
                    " \\n" +
                    raiz.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.altura;
                cadena += '" -> ';
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero);
                cadena += '"';
                cadena +=
                    raiz.user_student.nombre +
                    " \\n" +
                    raiz.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.altura;
                cadena += '" -> ';
                cadena += "x" + numero + '[style="invis"]';
                cadena +=
                    "{rank=same" +
                    '"' +
                    raiz.izquierdo.user_student.nombre +
                    " \\n" +
                    raiz.izquierdo.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.izquierdo.altura +
                    '"' +
                    " -> " +
                    "x" +
                    numero +
                    ' [style="invis"]};\n ';
            } else if (raiz.izquierdo === null && !(raiz.derecho === null)) {
                cadena += " x" + numero + ' [label="",width=.1,style="invis"];\n';
                cadena += '"';
                cadena +=
                    raiz.user_student.nombre +
                    " \\n" +
                    raiz.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.altura;
                cadena += '" -> ';
                cadena += "x" + numero + '[style="invis"]';
                cadena += '; \n"';
                cadena +=
                    raiz.user_student.nombre +
                    " \\n" +
                    raiz.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.altura;
                cadena += '" -> ';
                cadena += this.retornarValoresArbol(raiz.derecho, numero);
                cadena +=
                    "{rank=same" +
                    " x" +
                    numero +
                    ' -> "' +
                    raiz.derecho.user_student.nombre +
                    " \\n" +
                    raiz.derecho.user_student.carnet +
                    " \\n" +
                    "Altura: " +
                    raiz.derecho.altura +
                    '"' +
                    ' [style="invis"]};\n';
            }
        }
        //console.log(cadena)
        return cadena;
    }

    retonarRaiz(raiz) {
        return raiz;
    }
    eliminarTodo() {
        this.raiz = null;
    }

    VerificandoPasswordYCarnetDelArbol(raiz, carnet, password) {
        if (raiz != null) {
            if (raiz.user_student.carnet == carnet) {
                if (raiz.user_student.password == password) {
                    return raiz.user_student;
                } else {
                    return false;
                }
            } else {
                if (carnet < raiz.user_student.carnet) {
                    return this.VerificandoPasswordYCarnetDelArbol(
                        raiz.izquierdo,
                        carnet,
                        password
                    );
                } else {
                    return this.VerificandoPasswordYCarnetDelArbol(
                        raiz.derecho,
                        carnet,
                        password
                    );
                }
            }
        } else {
            return false;
        }
    }

    CarnetExiste(raiz, carnet) {
        if (raiz != null) {
            if (raiz.user_student.carnet == carnet) {
                return true;
            } else {
                if (carnet < raiz.user_student.carnet) {
                    return this.CarnetExiste(raiz.izquierdo, carnet);
                } else {
                    return this.CarnetExiste(raiz.derecho, carnet);
                }
            }
        } else {
            return false;
        }
    }


    //funcin para el recorrido del avl
    recorrerPorAmplitud() {
        let cola = [];
        let visitados = [];
        let nodoActual = this.raiz;
        if (nodoActual != null) {
            cola.push(nodoActual);
            visitados.push(nodoActual);
        }
        while (cola.length > 0) {
            nodoActual = cola.shift();
            if (nodoActual.izquierdo != null && !visitados.includes(nodoActual.izquierdo)) {
                cola.push(nodoActual.izquierdo);
                visitados.push(nodoActual.izquierdo);
            }
            if (nodoActual.derecho != null && !visitados.includes(nodoActual.derecho)) {
                cola.push(nodoActual.derecho);
                visitados.push(nodoActual.derecho);
            }
        }
        return visitados;
    }



    //Buscar un nodo en el arbol por medio de carnet y que pueda darle un nuevo nodo useeer_student y que se actualice el arbol avl
    // BuscarNodo(raiz, carnet, userrstudent) {
    //     if (raiz != null) {
    //         if (raiz.user_student.carnet == carnet) {
    //             raiz.user_student = userrstudent;
    //             return raiz;
    //         } else {
    //             if (carnet < raiz.user_student.carnet) {
    //                 return this.BuscarNodo(raiz.izquierdo, carnet, userrstudent);
    //             } else {
    //                 return this.BuscarNodo(raiz.derecho, carnet, userrstudent);
    //             }
    //         }
    //     } else {
    //         return false;
    //     }
    // }

    BuscarNodo(raiz, carnet, userrstudent) {
        if (raiz != null) {
            if (raiz.user_student.carnet == carnet) {
                raiz.user_student = userrstudent;
                return raiz;
            } else {
                if (carnet < raiz.user_student.carnet) {
                    raiz.izquierdo = this.BuscarNodo(raiz.izquierdo, carnet, userrstudent);
                } else {
                    raiz.derecho = this.BuscarNodo(raiz.derecho, carnet, userrstudent);
                }
                raiz.altura =
                    1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho));
                let balanceo = this.Equilibrio(raiz);
                raiz.factor_equilibrio = balanceo;
                // Rotacion Simple a la Izquierda
                if (balanceo > 1 && carnet > raiz.derecho.user_student.carnet) {
                    return this.RotacionI(raiz);
                }
                // Rotacion Simple a la Derecha
                if (balanceo < -1 && carnet < raiz.izquierdo.user_student.carnet) {
                    return this.RotacionD(raiz);
                }
                // Rotacion Doble a la Izquierda
                if (balanceo > 1 && carnet < raiz.derecho.user_student.carnet) {
                    raiz.derecho = this.RotacionD(raiz.derecho);
                    return this.RotacionI(raiz);
                }
                // Rotacion Doble a la Derecha
                if (balanceo < -1 && carnet > raiz.izquierdo.user_student.carnet) {
                    raiz.izquierdo = this.RotacionI(raiz.izquierdo);
                    return this.RotacionD(raiz);
                }
            }
        }
        return raiz;
    }



}

//Nodo Lista Circular
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

//Clase de la Lista Circular
class ListaCircularSimple {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.tamaño = 0;
    }

    //Metodo para agregar un nuevo nodo a la lista
    agregar(valor) {
        const nuevoNodo = {
            valor: valor,
            siguiente: null,
        };
        if (this.primero === null) {
            nuevoNodo.siguiente = nuevoNodo;
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
        } else {
            this.ultimo.siguiente = nuevoNodo;
            nuevoNodo.siguiente = this.primero;
            this.ultimo = nuevoNodo;
        }
        this.tamaño++;
    }

    //Metodo para eliminar un nodo de la lista

    eliminar(valor) {
        if (this.primero === null) {
            return false;
        }
        let nodoActual = this.primero;
        let nodoAnterior = null;
        do {
            if (nodoActual.valor === valor) {
                if (nodoActual === this.primero) {
                    this.primero = nodoActual.siguiente;
                    this.ultimo.siguiente = this.primero;
                } else if (nodoActual === this.ultimo) {
                    this.ultimo = nodoAnterior;
                    this.ultimo.siguiente = this.primero;
                } else {
                    nodoAnterior.siguiente = nodoActual.siguiente;
                }
                this.tamaño--;
                return true;
            }
            nodoAnterior = nodoActual;
            nodoActual = nodoActual.siguiente;
        } while (nodoActual !== this.primero);
        return false;
    }

    //Metodo para buscar un nodo en la lista

    buscar(valor) {
        if (this.primero === null) {
            return null;
        }
        let nodoActual = this.primero;
        do {
            if (nodoActual.valor === valor) {
                return nodoActual;
            }
            nodoActual = nodoActual.siguiente;
        } while (nodoActual !== this.primero);
        return null;
    }

    //Metodo para obtener el tamaño de la lista
    getTamaño() {
        return this.tamaño;
    }

    //Metodo para generar el codigo dot de la lista y poder graficarla
    getDot() {
        let dot = "digraph ListaCircularSimple {";
        dot +=
            '  node[shape=folder ,fontsize="10pt",penwidth=2,fontname="Courier New",style="filled",fillcolor="goldenrod1",fontcolor="gray6"];';
        dot += "  graph[pencolor=transparent];";
        dot += "  rankdir=LR;";

        if (this.primero !== null) {
            let i = 0;
            for (
                let nodoActual = this.primero;
                nodoActual !== this.ultimo;
                nodoActual = nodoActual.siguiente
            ) {
                dot += `  p${i}[label="${nodoActual.valor}"];`;
                dot += `  p${i} -> p${i + 1};`;
                i++;
            }

            // Agrega el último nodo y la arista de vuelta al primer nodo
            dot += `  p${i}[label="${this.ultimo.valor}"];`;
            dot += `  p${i} -> p0[constraint=false, arrowtail=curve];`;
        }

        dot += "}";
        console.log(dot);
        return dot;
    }
}

//Clase del Nodo del Arbol N-ario
class nodoArbolN {
    constructor(valor, id) {
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
        this.matriz = new MatrizDispersa();
    }
}

/*Clase del Arbol N-ario */
class ArbolNArio {
    constructor() {
        this.raiz = new nodoArbolN("/", 0);
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta) {
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero;
            while (aux) {
                if (aux.valor === carpeta_nueva) {
                    return 1;
                }
                aux = aux.siguiente;
            }
            return 2;
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (lista_carpeta[1] === "" && this.raiz.primero === null) {
            return 5;
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if (lista_carpeta[1] !== "" && this.raiz.primero === null) {
            return 3;
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero;
            let nivel = lista_carpeta.length;
            let posicion = 1;
            for (var i = 1; i < nivel; i++) {
                if (aux !== null) {
                    while (aux) {
                        if (
                            posicion < lista_carpeta.length &&
                            lista_carpeta[posicion] === aux.valor
                        ) {
                            posicion++;
                            if (aux.primero !== null && posicion < lista_carpeta.length) {
                                aux = aux.primero;
                            }
                            break;
                        } else {
                            aux = aux.siguiente;
                        }
                    }
                } else {
                    break;
                }
            }
            if (aux !== null) {
                aux = aux.primero;
                while (aux) {
                    if (aux.valor === carpeta_nueva) {
                        return 1;
                    }
                    aux = aux.siguiente;
                }
                return 2;
            } else {
                return 4;
            }
        }
    }

    insertarOrdenado(raiz, nuevoNodo) {
        let piv = raiz.primero;
        if (nuevoNodo.valor < raiz.primero.valor) {
            nuevoNodo.siguiente = raiz.primero;
            raiz.primero = nuevoNodo;
            return raiz;
        } else {
            while (piv.siguiente) {
                if (
                    nuevoNodo.valor > piv.valor &&
                    nuevoNodo.valor < piv.siguiente.valor
                ) {
                    nuevoNodo.siguiente = piv.siguiente;
                    piv.siguiente = nuevoNodo;
                    return raiz;
                } else if (nuevoNodo.valor < piv.valor) {
                    nuevoNodo.siguiente = piv;
                    piv = nuevoNodo;
                    return raiz;
                } else {
                    piv = piv.siguiente;
                }
            }
            piv.siguiente = nuevoNodo;
            return raiz;
        }
    }
    // /usac/prueba -> prueba1 /usac/prueba(prueba1)
    insertarHijos(carpeta_nueva, lista_carpeta) {
        /**
         * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
         */
        const nuevoNodo = new nodoArbolN(carpeta_nueva, this.nodo_creados);
        this.nodo_creados++;
        //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
        if (lista_carpeta[1] === "" && this.raiz.primero === null) {
            this.raiz.primero = nuevoNodo;
        }
        //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
        else if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo);
        }
        //Corroboramos si la insercion es en algun directorio que no es la raiz
        else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero;
            let nivel = lista_carpeta.length;
            let posicion = 1;
            //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
            for (var i = 1; i < nivel; i++) {
                if (aux !== null) {
                    while (aux) {
                        //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
                        if (
                            posicion < lista_carpeta.length &&
                            lista_carpeta[posicion] === aux.valor
                        ) {
                            posicion++;
                            //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
                            if (aux.primero !== null && posicion < lista_carpeta.length) {
                                aux = aux.primero;
                            }
                            break;
                        } else {
                            aux = aux.siguiente;
                        }
                    }
                } else {
                    break;
                }
            }
            //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
            if (aux.primero === null) {
                aux.primero = nuevoNodo;
            } else {
                aux = this.insertarOrdenado(aux, nuevoNodo);
            }
        }
    }
    /**
     * 1 - Carpeta ya existe
     * 2 - la carpeta no existe
     * 3 - El directorio no es correcto o no es valido
     * 4 - Directorio no valido
     * 5 - No existe ninguna carpeta en la raiz
     *
     */
    insertarValor(ruta, carpeta_nueva, numero) {
        let lista_carpeta = ruta.split("/");
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta);
        switch (existe_carpeta) {
            case 1:
                //ese código verifica si la carpeta ya existe y si existe crea una copia con el numero que le corresponde
                let copia = carpeta_nueva + "(" + numero + ")";
                while (this.BuscarCarpeta(copia, lista_carpeta) === 1) {
                    numero++;
                    copia = carpeta_nueva + "(" + numero + ")";
                }
                this.insertarHijos(copia, lista_carpeta);
                console.log(
                    "Carpeta ya existe y se creará una copia con el número " + numero
                );
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta);
                break;
            case 3:
                alert("La ruta actual no existe");
                break;
            case 4:
                alert("La ruta actual no es valida");
                break;
            case 5:
                this.insertarHijos(carpeta_nueva, lista_carpeta);
                break;
        }
    }
    grafica_arbol(raiz) {
        var cadena = "";
        if (!(raiz === null)) {
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(raiz);
            cadena = cadena + "}";
        } else {
            cadena = "digraph G { arbol }";
        }
        console.log(cadena);
        return cadena;
    }

    /** le mando el parametro primero y solo recorre los siguientes*/
    retornarValoresArbol(raiz) {
        var cadena =
            'node[shape=folder ,fontsize="10pt",penwidth=2,fontname="Courier New",style="filled",fillcolor="lightslateblue",fontcolor="whitesmoke"] ';
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + '[label="' + raiz.valor + '"] ';
        cadena += this.valoresSiguietes(raiz.primero, nodo, nodo_padre);
        cadena += this.conexionRamas(raiz.primero, 0);
        return cadena;
    }

    valoresSiguietes(raiz, nodo, nodo_padre) {
        let cadena = "";
        let aux = raiz;
        let nodo_padre_aumento = nodo_padre;
        if (aux !== null) {
            while (aux) {
                cadena += "nodo" + aux.id + '[label="' + aux.valor + '"] ';
                aux = aux.siguiente;
            }
            aux = raiz;
            while (aux) {
                nodo_padre_aumento++;
                cadena += this.valoresSiguietes(
                    aux.primero,
                    this.nodo_creados,
                    nodo_padre_aumento
                );
                aux = aux.siguiente;
            }
        }
        return cadena;
    }

    conexionRamas(raiz, padre) {
        let cadena = "";
        let aux = raiz;
        if (aux !== null) {
            while (aux) {
                cadena += "nodo" + padre + " -> nodo" + aux.id + " ";
                aux = aux.siguiente;
            }
            aux = raiz;
            while (aux) {
                cadena += this.conexionRamas(aux.primero, aux.id);
                aux = aux.siguiente;
            }
        }
        return cadena;
    }
    /** Modificacion 30/03/2023 */
    BuscarCarpetaV2(lista_carpeta) {
        //Directorio Actual seria la Raiz
        if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
            return this.raiz;
        }
        //Directorio Actual seria Raiz pero no contiene elementos
        else if (lista_carpeta[1] === "" && this.raiz.primero === null) {
            return null;
        }
        //Actual no es raiz pero tampoco hay elementos en raiz
        else if (lista_carpeta[1] !== "" && this.raiz.primero === null) {
            return null;
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero;
            let nivel = lista_carpeta.length;
            let posicion = 1;
            for (var i = 1; i < nivel; i++) {
                if (aux !== null) {
                    while (aux) {
                        if (
                            posicion < lista_carpeta.length &&
                            lista_carpeta[posicion] === aux.valor
                        ) {
                            posicion++;
                            if (aux.primero !== null && posicion < lista_carpeta.length) {
                                aux = aux.primero;
                            }
                            break;
                        } else {
                            aux = aux.siguiente;
                        }
                    }
                } else {
                    break;
                }
            }
            if (aux !== null) {
                return aux;
            } else {
                return null;
            }
        }
    }

    mostrarCarpetasActualess(ruta) {
        let lista_carpeta = ruta.split("/");
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta);
        try {
            if (existe_carpeta !== null) {
                let aux = existe_carpeta.primero;
                while (aux) {
                    console.log("Carpeta: ", aux.valor);
                    aux = aux.siguiente;
                }
                let aux1 = existe_carpeta.matriz;
                aux1.recorrer();
            }
        } catch (error) {
            console.log("Hubo un error");
        }
    }

    // BuscarCarpetaV2(lista_carpeta, raiz) {
    //     //Directorio Actual seria la Raiz
    //     if (lista_carpeta[1] === "" && raiz.primero !== null) {
    //         return raiz;
    //     }
    //     //Directorio Actual seria Raiz pero no contiene elementos
    //     else if (lista_carpeta[1] === "" && raiz.primero === null) {
    //         return null;
    //     }
    //     //Actual no es raiz pero tampoco hay elementos en raiz
    //     else if (lista_carpeta[1] !== "" && raiz.primero === null) {
    //         return null;
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
    //             return aux;
    //         } else {
    //             return null;
    //         }
    //     }
    // }

    agregarFilaTablaCarpeta(carpeta, tabla) {
        // Crear una nueva fila en la tabla
        let fila = tabla.insertRow();

        // Agregar una celda con el ícono de la carpeta
        let celdaIcono = fila.insertCell();
        let icono = document.createElement("i");
        icono.classList.add("fa", "fa-folder");
        celdaIcono.appendChild(icono);

        // Agregar una celda con el nombre de la carpeta
        let celdaNombre = fila.insertCell();
        celdaNombre.textContent = carpeta.valor;
    }

    // mostrarCarpetasActuales(ruta) {
    //     let lista_carpeta = ruta.split("/");
    //     let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta);
    //     try {
    //         if (existe_carpeta !== null) {
    //             let aux = existe_carpeta.primero;
    //             while (aux) {
    //                 this.agregarFilaTablaCarpeta(aux, table2);
    //                 aux = aux.siguiente;
    //             }
    //         }
    //     } catch (error) {
    //         console.log("Hubo un error");
    //     }
    // }

    mostrarCarpetasActuales(ruta) {
        let lista_carpeta = ruta.split("/");
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta);
        try {
            if (existe_carpeta !== null) {
                let aux = existe_carpeta.primero;
                table2.innerHTML = "";
                while (aux) {
                    let fila = table2.insertRow(-1);
                    let celdaIcono = fila.insertCell(0);
                    let celdaNombre = fila.insertCell(1);
                    celdaNombre.innerText = aux.valor;
                    if (aux.valor.endsWith(".txt")) {
                        celdaIcono.innerHTML = '<i class="fas fa-file-alt"></i>';
                    } else {
                        celdaIcono.innerHTML = '<i class="fas fa-folder"></i>';
                    }
                    aux = aux.siguiente;
                }
            }
        } catch (error) {
            console.log("Hubo un error");
        }
    }

    eliminarCarpeta(ruta, carpeta) {
        let lista_carpeta = ruta.split("/");
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta);
        if (existe_carpeta !== null) {
            let aux = existe_carpeta.primero;
            let aux_anterior = null;
            while (aux) {
                if (aux.valor === carpeta) {
                    if (aux_anterior !== null) {
                        aux_anterior.siguiente = aux.siguiente;
                    } else {
                        existe_carpeta.primero = aux.siguiente;
                    }
                    break;
                } else {
                    aux_anterior = aux;
                    aux = aux.siguiente;
                }
            }
        }
        console.log("Carpeta Eliminada");
    }

    eliminarCarpeta(ruta, carpeta, raiz) {
        let lista_carpeta = ruta.split("/");
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta, raiz);
        if (existe_carpeta !== null) {
            let aux = existe_carpeta.primero;
            let aux_anterior = null;
            while (aux) {
                if (aux.valor === carpeta) {
                    if (aux_anterior !== null) {
                        aux_anterior.siguiente = aux.siguiente;
                    } else {
                        existe_carpeta.primero = aux.siguiente;
                    }
                    console.log("Carpeta eliminada");
                    break;
                } else {
                    aux_anterior = aux;
                    aux = aux.siguiente;
                }
            }
            // Verificar si la carpeta se eliminó correctamente
            let eliminado = true;
            aux = existe_carpeta.primero;
            while (aux) {
                if (aux.valor === carpeta) {
                    eliminado = false;
                    break;
                }
                aux = aux.siguiente;
            }
            if (!eliminado) {
                console.log("La carpeta no se pudo eliminar");
            }
        } else {
            console.log("La carpeta no existe");
        }
    }

    // el bueno
    agregarArchivoDesdeArbol(
        ruta,
        numeroArchivo,
        nombreArchivo,
        contenidoArchivo
    ) {
        // Obtener el nodo de la carpeta en la que deseas agregar el archivo en el árbol n-ario
        let lista_carpeta = ruta.split("/");
        let carpeta = this.BuscarCarpetaV2(lista_carpeta);
        // Si se encontró la carpeta en el árbol n-ario
        if (carpeta !== null) {
            let nuevamatriz = carpeta.matriz;
            // Copiar la matriz auxiliar en la matriz del nodo
            nuevamatriz.insertarArchivo(
                nombreArchivo,
                numeroArchivo,
                contenidoArchivo
            );
            console.log("Archivo agregado a la matriz dispersa.");
            console.log(nuevamatriz.recorrer());
        } else {
            console.log("No se encontró la carpeta en el árbol n-ario.");
        }
    }

    encontrarMatriz(ruta) {
        let lista_carpeta = ruta.split("/");
        let nodo_carpeta = this.BuscarCarpetaV2(lista_carpeta);
        if (nodo_carpeta !== null) {
            return nodo_carpeta.matriz;
        } else {
            return null;
        }
    }
}
//Clase Nodo para la Matriz Dispersa
class nodoMatrizDispersa {
    constructor(posX, posY, nombre_archivo, contenidoArchivo) {
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
        this.contenidoArchivo = contenidoArchivo;
    }
}

//Clase Matriz Dispersa
class MatrizDispersa {
    constructor() {
        this.principal = new nodoMatrizDispersa(-1, -1, "", null);
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }

    buscarF(nombre_archivo) {
        let aux = this.principal;
        while (aux) {
            /**if(aux.posY === y) */
            if (aux.posicion === nombre_archivo) {
                return aux;
            } else {
                aux = aux.abajo;
            }
        }
        return null;
    }

    buscarC(carnet) {
        let aux = this.principal;
        while (aux) {
            /**if(aux.posX === x) */
            if (aux.posicion === carnet) {
                return aux;
            } else {
                aux = aux.siguiente;
            }
        }
        return null;
    }

    insertarColumna(posicion, texto, contenidoArchivo) {
        const nuevoNodo = new nodoMatrizDispersa(
            posicion,
            -1,
            texto,
            contenidoArchivo
        );
        let piv = this.principal;
        let pivA = this.principal;
        while (piv.siguiente) {
            if (nuevoNodo.posX > piv.posX) {
                pivA = piv;
                piv = piv.siguiente;
            } else {
                nuevoNodo.siguiente = piv;
                nuevoNodo.anterior = pivA;
                pivA.siguiente = nuevoNodo;
                piv.anterior = nuevoNodo;
                return;
            }
        }
        nuevoNodo.anterior = piv;
        piv.siguiente = nuevoNodo;
    }

    insertarFila(posicion, texto, contenidoArchivo) {
        const nuevoNodo = new nodoMatrizDispersa(
            -1,
            posicion,
            texto,
            contenidoArchivo
        );
        let piv = this.principal;
        let pivA = this.principal;
        while (piv.abajo) {
            if (nuevoNodo.posY > piv.posY) {
                pivA = piv;
                piv = piv.abajo;
            } else {
                nuevoNodo.abajo = piv;
                nuevoNodo.arriba = pivA;
                pivA.abajo = nuevoNodo;
                piv.arriba = nuevoNodo;
                return;
            }
        }
        nuevoNodo.arriba = piv;
        piv.abajo = nuevoNodo;
    }

    insertarNodo(x, y, texto, contenidoArchivo) {
        const nuevoNodo = new nodoMatrizDispersa(x, y, texto, contenidoArchivo);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while (tempX.siguiente) {
            if (tempX.posX === nuevoNodo.posX) {
                break;
            }
            tempX = tempX.siguiente;
        }
        while (true) {
            if (tempX.posY === nuevoNodo.posY) {
                break;
            } else if (tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY) {
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            } else if (tempX.abajo === null) {
                nuevoNodo.arriba = tempX;
                nuevoNodo.abajo = tempX.abajo;
                tempX.abajo = nuevoNodo;
                break;
            } else {
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while (tempY.abajo) {
            if (tempY.posY === nuevoNodo.posY) {
                break;
            }
            tempY = tempY.abajo;
        }
        while (true) {
            if (tempY.posX === nuevoNodo.posX) {
                break;
            } else if (
                tempY.siguiente !== null &&
                tempY.siguiente.posX > nuevoNodo.posX
            ) {
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            } else if (tempY.siguiente === null) {
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            } else {
                tempY = tempY.siguiente;
            }
        }
    }

    insertarElemento(x, y) {
        let texto = x + "," + y;
        let nuevaFila = this.buscarF(y);
        let nuevaColumna = this.buscarC(x);
        /** Fila y Columna no existen */
        if (nuevaFila === null && nuevaColumna === null) {
            this.insertarColumna(x, "C" + x);
            this.insertarFila(y, "F" + y);
            this.insertarNodo(x, y, texto);
        } else if (nuevaFila === null && nuevaColumna !== null) {
            /* Fila no existe, Columna si existe */
            this.insertarFila(y, "F" + y);
            this.insertarNodo(x, y, texto);
        } else if (nuevaFila !== null && nuevaColumna === null) {
            /* Fila si existe, Columna no existe */
            this.insertarColumna(x, "C" + x);
            this.insertarNodo(x, y, texto);
        } else if (nuevaFila !== null && nuevaColumna !== null) {
            /* Fila si existe, Columna si existe */
            this.insertarNodo(x, y, texto);
        } else {
            console.log("Me dio Ansiedad :(");
        }
    }

    insertarArchivo(texto, numero, contenidoArchivo) {
        let nuevaFila = this.buscarF(texto);
        if (nuevaFila === null) {
            this.insertarFila(this.coordenadaY, texto, contenidoArchivo);
            this.coordenadaY++;
            console.log("Insertando Archivo");
        } else {
            let copia_archivo = "(" + numero++ + ")" + nombreArchivo;
            this.insertarArchivo(copia_archivo, numero, contenidoArchivo);
            console.log("Insertar Copia");
        }
    }

    colocarPermiso(archivo, carnet, permisos) {
        /** NOTA: Paso Previo Buscar en AVL si existe el carnet*/
        let AbolitoStor = JSON.parse(localStorage.getItem("TreeAVL"));
        if (arbolBinarioAVL.CarnetExiste(AbolitoStor, carnet) == true) {
            let nuevaColumna = this.buscarC(carnet);
            let nuevaFila = this.buscarF(archivo);
            if (nuevaColumna === null) {
                this.insertarColumna(this.coordenadaX, carnet);
                this.coordenadaX++;
                nuevaColumna = this.buscarC(carnet);
            }
            if (nuevaColumna !== null && nuevaFila !== null) {
                this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, permisos);
            }
        } else {
            console.log("El carnet no existe en el sistema");
        }
    }

    recorrerMatrizzzzz() {
        let nodoActual = this.principal;
        while (nodoActual) {
            let nodoFila = nodoActual;
            while (nodoFila) {
                let nodoColumna = nodoFila;
                while (nodoColumna) {
                    console.log("Posición: ", nodoColumna.posicion);
                    nodoColumna = nodoColumna.derecha;
                }
                nodoFila = nodoFila.abajo;
            }
            nodoActual = nodoActual.siguiente;
        }
    }
    // imprime en consola lo que tiene la matriz actual
    recorrer() {
        let tempFila = this.principal.abajo;
        while (tempFila !== null) {
            let tempColumna = tempFila;
            while (tempColumna !== null) {
                // console.log(`[${tempColumna.posX}, ${tempFila.posY}]: ${tempColumna.posicion}`);
                console.log("Archivo: ", tempColumna.posicion);
                tempColumna = tempColumna.siguiente;
            }
            tempFila = tempFila.abajo;
        }
    }

    existeArchivo(numeroArchivo, nombreArchivo) {
        let nodoActual = this.principal;
        while (nodoActual) {
            let nodoFila = nodoActual;
            while (nodoFila) {
                let nodoColumna = nodoFila;
                while (nodoColumna) {
                    if (
                        nodoColumna.numero === numeroArchivo &&
                        nodoColumna.nombre === nombreArchivo
                    ) {
                        return true;
                    }
                    nodoColumna = nodoColumna.derecha;
                }
                nodoFila = nodoFila.abajo;
            }
            nodoActual = nodoActual.siguiente;
        }
        return false;
    }

    // recorrerMatriz() {
    //     let nodoActual = this.principal;
    //     while (nodoActual) {
    //         let nodoFila = nodoActual;
    //         while (nodoFila) {
    //             let nodoColumna = nodoFila;
    //             while (nodoColumna) {
    //                 // Crear una nueva fila para la tabla
    //                 let fila = document.createElement("tr");

    //                 // Crear una celda para el nombre del archivo
    //                 let celdaNombre = document.createElement("td");
    //                 celdaNombre.innerText = nodoColumna.posicion;

    //                 // Crear una celda para el icono
    //                 let celdaIcono = document.createElement("td");
    //                 let extension = nodoColumna.posicion.split('.').pop().toLowerCase();
    //                 if (extension === "pdf") {
    //                     celdaIcono.innerHTML = '<i class="far fa-file-pdf"></i>';
    //                 } else if (extension === "jpg" || extension === "jpeg" || extension === "png") {
    //                     celdaIcono.innerHTML = '<i class="far fa-image"></i>';
    //                 } else if (extension === "txt") {
    //                     celdaIcono.innerHTML = '<i class="far fa-file-alt"></i>';
    //                 } else {
    //                     celdaIcono.innerHTML = '<i class="far fa-file"></i>';
    //                 }

    //                 // Agregar las celdas a la fila
    //                 fila.appendChild(celdaIcono);
    //                 fila.appendChild(celdaNombre);

    //                 // Agregar la fila a la tabla
    //                 table2.appendChild(fila);

    //                 nodoColumna = nodoColumna.derecha;
    //             }
    //             nodoFila = nodoFila.abajo;
    //         }
    //         nodoActual = nodoActual.siguiente;
    //     }
    // }

    reporte() {
        let cadena = "";
        let aux1 = this.principal;
        let aux2 = this.principal;
        let aux3 = this.principal;
        if (aux1 !== null) {
            //cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            cadena =
                'digraph MatrizCapa{node[shape=folder ,fontsize="10pt",penwidth=2,fontname="Courier New",style="filled",fillcolor="lightslateblue",fontcolor="whitesmoke"] rankdir=UD;  {rank=min;';
            /** Creacion de los nodos actuales */
            while (aux1) {
                cadena +=
                    "nodo" +
                    (aux1.posX + 1) +
                    (aux1.posY + 1) +
                    '[label="' +
                    aux1.posicion +
                    '" ,rankdir=LR,group=' +
                    (aux1.posX + 1) +
                    "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}";
            while (aux2) {
                aux1 = aux2;
                cadena += "{rank=same; ";
                while (aux1) {
                    cadena +=
                        "nodo" +
                        (aux1.posX + 1) +
                        (aux1.posY + 1) +
                        '[label="' +
                        aux1.posicion +
                        '" ,group=' +
                        (aux1.posX + 1) +
                        "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.siguiente) {
                    cadena +=
                        "nodo" +
                        (aux1.posX + 1) +
                        (aux1.posY + 1) +
                        " -> " +
                        "nodo" +
                        (aux1.siguiente.posX + 1) +
                        (aux1.siguiente.posY + 1) +
                        " [dir=both];";
                    aux1 = aux1.siguiente;
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.abajo) {
                    cadena +=
                        "nodo" +
                        (aux1.posX + 1) +
                        (aux1.posY + 1) +
                        " -> " +
                        "nodo" +
                        (aux1.abajo.posX + 1) +
                        (aux1.abajo.posY + 1) +
                        " [dir=both];";
                    aux1 = aux1.abajo;
                }
                aux2 = aux2.siguiente;
            }
            cadena += "}";
        } else {
            cadena = "No hay elementos en la matriz";
        }
        return cadena;
    }

    serializarMatrizDispersa() {
        let nodos = [];
        let tempY = this.principal;

        // Recorrer filas
        while (tempY.abajo) {
            tempY = tempY.abajo;
            let tempX = tempY;

            // Recorrer columnas
            while (tempX.siguiente) {
                tempX = tempX.siguiente;

                // Agregar nodo a la lista de nodos
                nodos.push({
                    posX: tempX.posX,
                    posY: tempY.posY,
                    posicion: tempX.posicion,
                    contenidoArchivo: tempX.contenidoArchivo,
                });
            }
        }

        // Retornar objeto JSON con la lista de nodos
        return { nodos: nodos };
    }

    BuscarPosicionYcontenidoArchivo(posicion) {
        let tempY = this.principal;

        // Recorrer filas
        while (tempY.abajo) {
            tempY = tempY.abajo;
            let tempX = tempY;

            // Recorrer columnas
            while (tempX.siguiente) {
                tempX = tempX.siguiente;
                if (tempX.posicion === posicion) {
                    return tempX.contenidoArchivo;
                }
            }
        }
        return null;
    }
}

// function matrizToJson(matriz) {
//     let nodos = [];

//     let nodo = matriz.principal;
//     while (nodo != null) {
//         let columnas = [];

//         let temp = nodo;
//         while (temp != null) {
//             columnas.push({
//                 posX: temp.posX,
//                 posY: temp.posY,
//                 nombre_archivo: temp.posicion,
//                 contenidoArchivo: temp.contenidoArchivo,
//             });
//             temp = temp.abajo;
//         }

//         nodos.push(columnas);
//         nodo = nodo.derecha;
//     }

//     let json = {
//         nodos: nodos,
//         coordenadaX: matriz.coordenadaX,
//         coordenadaY: matriz.coordenadaY,
//     };

//     return JSON.stringify(json);
// }





// clase nodo para la tabla hash

function matrizToJson(matriz) {
    let nodos = [];

    let nodo = matriz.principal;
    while (nodo != null) {
        let columnas = [];

        let temp = nodo;
        while (temp != null) {
            let fila = [];

            let aux = temp;
            while (aux != null) {
                fila.push({
                    posX: aux.posX,
                    posY: aux.posY,
                    nombre_archivo: aux.posicion,
                    contenidoArchivo: aux.contenidoArchivo,
                });
                aux = aux.siguiente;
            }

            columnas.push(fila);
            temp = temp.abajo;
        }

        nodos.push(columnas);
        nodo = nodo.derecha;
    }

    let json = {
        nodos: nodos,
        coordenadaX: matriz.coordenadaX,
        coordenadaY: matriz.coordenadaY,
    };

    return JSON.stringify(json);
}

//clase nodo para la tabla hash
class nodoHash {
    constructor(carnet, usuario, password, carpetaRaizgg, arbolnnario, listaCircular) {
        this.carnet = carnet;
        this.usuario = usuario;
        this.password = password;
        this.carpeta_raiz = carpetaRaizgg;
        this.arbolnnario = arbolnnario;
        this.listaCircular = listaCircular;
    }
}
// clase tabla hash
class TablaHash {
    constructor() {
        this.tabla = new Array(7);
        this.capacidad = 7;
        this.utilizacion = 0;
    }

    insertar(carnet, usuario, password, carpetaRaizgg, arbolnnario, listaCircular) {
        let indice = this.calcularIndice(carnet);
        const nuevoNodo = new nodoHash(carnet, usuario, password, carpetaRaizgg, arbolnnario, listaCircular);
        if (indice < this.capacidad) {
            try {
                if (this.tabla[indice] == null) {
                    console.log("Insertando...");
                    this.tabla[indice] = nuevoNodo;
                    this.utilizacion++;
                    this.capacidad_tabla();
                } else {
                    let contador = 1;
                    indice = this.RecalcularIndice(carnet, contador);
                    while (this.tabla[indice] != null) {
                        contador++;
                        indice = this.RecalcularIndice(carnet, contador);
                    }
                    this.tabla[indice] = nuevoNodo;
                    this.utilizacion++;
                    this.capacidad_tabla();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    calcularIndice(carnet) {
        let carnet_cadeena = carnet.toString();
        let divisor = 0;
        for (let i = 0; i < carnet_cadeena.length; i++) {
            divisor = divisor + carnet_cadeena.charCodeAt(i);
        }
        let indice_final = divisor % this.capacidad;
        return indice_final;
    }

    capacidad_tabla() {
        let aux_utilizacion = this.capacidad * 0.75;
        if (this.utilizacion > aux_utilizacion) {
            this.capacidad = this.nueva_capacidad();
            this.utilizacion = 0;
            this.ReInsertar();
        }
    }

    nueva_capacidad() {
        let numero = this.capacidad + 1;
        while (!this.Primoxd(numero)) {
            numero++;
        }
        return numero;
    }

    Primoxd(numero) {
        if (numero <= 1) {
            return false;
        }
        if (numero === 2) {
            return true;
        }
        if (numero % 2 === 0) {
            return false;
        }
        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
            if (numero % i === 0) {
                return false;
            }
        }
        return true;
    }

    ReInsertar() {
        const aux_tabla = this.tabla;
        this.tabla = new Array(this.capacidad);
        aux_tabla.forEach((alumno) => {
            this.insertar(alumno.carnet, alumno.usuario, alumno.password, alumno.carpetaRaizgg, alumno.arbolnnario, alumno.listaCircular);
        });
    }

    RecalcularIndice(carnet, intento) {
        let nuevo_indicie = this.calcularIndice(carnet) + intento * intento;
        let nuevo = this.Nuevo_indicie(nuevo_indicie);
        return nuevo;
    }

    Nuevo_indicie(numero) {
        let nueva_posicion = 0;
        if (numero < this.capacidad) {
            nueva_posicion = numero;
        } else {
            nueva_posicion = numero - this.capacidad;
            nueva_posicion = this.Nuevo_indicie(nueva_posicion);
        }
        return nueva_posicion;
    }

}

// creacion arbol n-ario
const arbolnario = new ArbolNArio();

// creacion tabla hash
let tablaHash = new TablaHash();

//Creacion Maatriz Dispersa
let matriZ = new MatrizDispersa();
const listaCircular = new ListaCircularSimple();
//Funciones para el reporte de la matriz
function reporteMatriz() {
    let url = "https://quickchart.io/graphviz?graph=";
    let matrizz = arbolnario.encontrarMatriz(document.getElementById("rutaCarpeta").value);
    let usuarioActualAux = JSON.parse(localStorage.getItem("usuarioActual"));
    let arbolActualusuario = usuarioActualAux.arbolNario;
    matriZ = matrizz;
    let matrizInLocal = matrizToJson(matriZ);
    arbolActualusuario.matriz = matrizInLocal;
    localStorage.setItem("matrizActual", matrizInLocal);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualAux));
    console.log("Matriz actual: ", matrizInLocal);
    console.log("Carnet actual: ", usuarioActualAux.carnet);
    console.log("Usuario actual: ", usuarioActualAux)
    let auxmatrix = JSON.parse(localStorage.getItem("matrizActual"));
    console.log("xd: ", auxmatrix);
    let body = matriZ.reporte();
    $("#imageMatriz").attr("src", url + body);
}


//Funcion para asignar permisos
function asignarPermisos() {
    let cadena = document.getElementById("permisosCarnet").value;
    let ubicacionaux = document.getElementById("rutaCarpeta").value;
    let usuarioActualAux = JSON.parse(localStorage.getItem("usuarioActual"));
    let contenido64 = "";
    let arreglo = cadena.split("-");
    let matrixx = arbolnario.encontrarMatriz(
        document.getElementById("rutaCarpeta").value
    );

    for (let i = 0; i < PermisosxD.length; i++) {
        if (PermisosxD[i].nombre == arreglo[0]) {
            contenido64 = PermisosxD[i].contenido;
        }
    }
    matriZ = matrixx;
    matriZ.colocarPermiso(arreglo[0], arreglo[1], arreglo[2]);

    const permiso = {
        carnetPropetario: usuarioActualAux.carnet,
        carnetDestino: arreglo[1],
        ubicacion: ubicacionaux,
        nombreArchivo: arreglo[0],
        tipoPermiso: arreglo[2],
        Archivoenbase64: contenido64
    }
    StudentsPermisos.push(permiso);
    localStorage.setItem("StudentsPermisos", JSON.stringify(StudentsPermisos));
    console.log("Matrizzzzz: ", matriZ);
    reporteMatriz();
}


function xd() {
    let ruta = document.getElementById("rutaCarpeta").value;
    arbolnario.mostrarCarpetasActualess(ruta);
}

//Funcion para insertar un archivo en la matriz
function cargarAr(nombreArchivo, contenidoArchivo) {
    let usuarioActuaaal = JSON.parse(localStorage.getItem("usuarioActual"));
    let rutaaa = document.getElementById("rutaCarpeta").value;
    const nuevoPermisoAuxiliar = {
        nombre: nombreArchivo,
        contenido: contenidoArchivo,
    }
    PermisosxD.push(nuevoPermisoAuxiliar);

    arbolnario.agregarArchivoDesdeArbol(rutaaa, 1, nombreArchivo, contenidoArchivo);
    // usuarioActuaaal.arbolNario = arbolnario;
    // localStorage.setItem("usuarioActual", JSON.stringify(usuarioActuaaal));

    listaCircular.agregar("Se creo un archivo " + obtenerFechaYHoraActual());
    console.log("Arbolito actualizado: ", arbolnario);

    //localStorage.setItem("usuarioActual", JSON.stringify(usuarioActuaaal));
    //reporteMatriz();
}

// funcion para actualizar avl en local storage
function ActualizarAvl() {
    let arbolitoAvlenLocal = JSON.parse(localStorage.getItem("TreeAVL"));
    let usuarioActuaalAux = JSON.parse(localStorage.getItem("usuarioActual"))
    let avlActualizaod = arbolBinarioAVL.BuscarNodo(arbolitoAvlenLocal, usuarioActuaalAux.carnet, usuarioActuaalAux)
    console.log("AVL actualizado: ", avlActualizaod);
    localStorage.setItem("TreeAVL", JSON.stringify(avlActualizaod));
}

function cargar() {
    console.log("xd");
}

// function cargarArchivo(nombreArchivo, contenidoArchivo) {

//     matriZ.insertarArchivo(nombreArchivo, 1, base64String)
//     console.log(matriZ)
//     reporteMatriz();
// }

function ReporteListaCircular() {
    let url = "https://quickchart.io/graphviz?graph=";
    let body = listaCircular.getDot();
    $("#imageBitacora").attr("src", url + body);
}

function obtenerFechaYHoraActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    var fechaYHoraActual =
        "El: " +
        dia.toString() +
        "/" +
        mes.toString() +
        "/" +
        anio.toString() +
        " " +
        " a las: " +
        hora.toString() +
        ":" +
        minutos.toString() +
        ":" +
        segundos.toString();
    return fechaYHoraActual;
}

//funcion para insertar un nodo en el arbol n-ario
function agregarVarios() {
    const usuarioActuaaal = JSON.parse(localStorage.getItem("usuarioActual"));
    console.log("Usuario Actual: ", usuarioActuaaal);
    let raizActual = usuarioActuaaal.arbolNario.raiz;
    console.log("Raiz Actual: ", raizActual);
    let arbolNarioActual = usuarioActuaaal.arbolNario;
    console.log("Arbol Nario Actual: ", arbolNarioActual);
    let ruta = document.getElementById("rutaCarpeta").value;
    let carpeta = document.getElementById("NombreCarpeta").value;
    console.log("Ruta: " + ruta);
    console.log("Carpeta: " + carpeta);
    try {
        arbolnario.insertarValor(ruta, carpeta, 1, raizActual);
        listaCircular.agregar("Se creo una carpeta " + obtenerFechaYHoraActual());
        usuarioActuaaal.arbolNario = arbolnario;
        console.log("Arbol Nnnario:", arbolnario);
        console.log("Se inserto el nodo correctamente");
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActuaaal));
        console.log("Usuario Luego de insersion: ", usuarioActuaaal);
    } catch (error) {
        alert("Hubo un error al insertar el nodo");
    }
    document.getElementById("NombreCarpeta").value = "";
}

//Function para eliminar un nodo del arbol n-ario
function BuscarCarpetaYEliminar() {
    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    let ruta = document.getElementById("rutaCarpeta").value;
    let carpeta = document.getElementById("NombreCarpeta").value;
    arbolnario.eliminarCarpeta(ruta, carpeta);
    listaCircular.agregar("Se eliminó una carpeta " + obtenerFechaYHoraActual());
    usuarioActual.arbolNario = arbolnario;
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
}

// funcion para refrescar el arbol n-ario
function refrescarArbolNario() {
    let usuarioActuaaal = JSON.parse(localStorage.getItem("usuarioActual"));
    let arbolNario = usuarioActuaaal.arbolNario.raiz;
    console.log("Arbol Nario: ", arbolNario);
    let url = "https://quickchart.io/graphviz?graph=";
    let body = arbolnario.grafica_arbol(arbolNario);
    $("#imageNario").attr("src", url + body);
    document.getElementById("NombreCarpeta").value = "";
    console.log(
        "El tamaño estimado de localStorage es de:",
        getLocalStorageSize(),
        "bytes."
    );
    // Actualizar el árbolNario del usuario en el array de usuarios
    let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || []; // Obtener array de usuarios del localStorage
    let usuarioIndex = usuariosArray.findIndex(
        (u) => u.carnet === usuarioActuaaal.carnet
    ); // Buscar el índice del usuario en el array
    if (usuarioIndex !== -1) {
        // Si el usuario existe en el array, actualizarlo
        usuariosArray[usuarioIndex].arbolNario = usuarioActuaaal.arbolNario;
        localStorage.setItem("usuarios", JSON.stringify(usuariosArray)); // Guardar el array de usuarios actualizado en el localStorage
    }
}

// funcion para mostrar las carpetas actuales
function mostraCarpetas() {
    localStorage.getItem("usuarioActual");
    let usuarioActuaaal = JSON.parse(localStorage.getItem("usuarioActual"));
    let arbolNario = usuarioActuaaal.arbolNario.raiz;
    let ruta = document.getElementById("rutaCarpeta").value;
    table2.appendChild(encabezado2);
    arbolnario.mostrarCarpetasActuales(ruta, arbolNario);
}

function MostrarTabla() {
    LimpiarTabla();
    mostraCarpetas();
}

function LimpiarTabla() {
    table2.innerHTML = "";
}

// creación de arbol AVL
const arbolBinarioAVL = new ArbolAVL();

function agregarVariosNumeros() {
    let valor = document.getElementById("valor").value;
    let valores = valor.split(",");
    try {
        valores.forEach((numero) => {
            arbolBinarioAVL.insertaValor(parseInt(numero));
        });
    } catch (error) {
        console.log(error);
    }
    refrescarArbolAVL();
}

//funcion para limpiar el arbol AVL
function limpiar() {
    arbolBinarioAVL.eliminarTodo();
    let url = "https://quickchart.io/graphviz?graph=digraph G { arbol }";
    $("#image").attr("src", url);
    //document.getElementById("valor").value = "";
}

// función para refrescar el arbol
function refrescarArbolAVL() {
    let ArbolenStorage = JSON.parse(window.localStorage.getItem("TreeAVL"));
    console.log(typeof ArbolenStorage);
    console.log("Arbol: ", ArbolenStorage);
    let url = "https://quickchart.io/graphviz?graph=";
    let body = arbolBinarioAVL.grafica_arbol(ArbolenStorage);

    console.log(body);
    $("#image").attr("src", url + body);
}

//Funcion que obtiene el arbol del local storage y lo recorre en postOrder
function retonarDatosStoragePost() {
    let ArbolitoStorage = JSON.parse(window.localStorage.getItem("TreeAVL"));
    //console.log(typeof ArbolenStorage);
    //console.log("Arbol Post: ", ArbolenStorage)
    let PostOrden = arbolBinarioAVL.PostOrdenAVL(ArbolitoStorage);
    console.log("post: ", ArbolitoStorage);
    clinTable();
    table.appendChild(encabezado);
    recorrerArbolPostOrder(ArbolitoStorage);
}

//Funcion que obtiene el arbol del local storage y lo recorre en preOrder
function retonarDatosStoragePre() {
    let ArbolitoStorage1 = JSON.parse(window.localStorage.getItem("TreeAVL"));
    // console.log(typeof ArbolenStorage);
    // console.log("Arbol Pre: ", ArbolenStorage)
    let PreOrden = arbolBinarioAVL.PreOrdenAVL(ArbolitoStorage1);
    console.log("Pre: ", ArbolitoStorage1);
    clinTable();
    table.appendChild(encabezado);
    recorrerArbolPreOrder(ArbolitoStorage1);
}

//Funcion que obtiene el arbol del local storage y lo recorre en inOrder
function retonarDatosStorageInOrder() {
    let ArbolitoStorage2 = JSON.parse(window.localStorage.getItem("TreeAVL"));
    let inOrder = arbolBinarioAVL.InOrderAVL(ArbolitoStorage2);
    // console.log(typeof ArbolenStorage);
    // console.log("Arbol: ", ArbolenStorage)
    console.log("InOrder: ", typeof ArbolitoStorage2, ArbolitoStorage2);

    clinTable();
    table.appendChild(encabezado);
    recorrerArbolInOrder(ArbolitoStorage2);
}

function retonarDatosStorage() {
    let ArbolenStorage = JSON.parse(window.localStorage.getItem("TreeAVL"));
    console.log(typeof ArbolenStorage);
    console.log("Arbol: ", ArbolenStorage);
    clinTable();
    recorrerArbol(ArbolenStorage);
}
//funcion para recorrer el arbol inorden y mostrarlo en la tabla
function recorrerArbolInOrder(raiz) {
    if (raiz !== null) {
        // Recorrer el subárbol izquierdo
        recorrerArbolInOrder(raiz.izquierdo);
        // Crear una fila para el nodo actual
        let fila = document.createElement("tr");
        // Insertar las columnas con los valores del nodo
        fila.innerHTML = `
			<td>${raiz.user_student.nombre}</td>
			<td>${raiz.user_student.carnet}</td>
			<td>${raiz.user_student.password}</td>
			<td>${raiz.user_student.carpeta_raiz}</td>
		`;
        // Insertar la fila en la tabla
        table.appendChild(fila);
        // Recorrer el subárbol derecho
        recorrerArbolInOrder(raiz.derecho);
    }
}

// Funcion para recorrer el árbol en postorden y mostrarlo en la tabla
function recorrerArbolPostOrder(raiz) {
    if (raiz !== null) {
        // Recorrer el subárbol izquierdo
        recorrerArbolPostOrder(raiz.izquierdo);
        // Recorrer el subárbol derecho
        recorrerArbolPostOrder(raiz.derecho);
        // Crear una fila para el nodo actual
        let fila = document.createElement("tr");
        // Insertar las columnas con los valores del nodo
        fila.innerHTML = `
			<td>${raiz.user_student.nombre}</td>
			<td>${raiz.user_student.carnet}</td>
			<td>${raiz.user_student.password}</td>
			<td>${raiz.user_student.carpeta_raiz}</td>
		`;
        // Insertar la fila en la tabla
        table.appendChild(fila);
    }
}

// Funcion para limpiar el contenido de la tabla
function clinTable() {
    table.innerHTML = "";
}
function clinTable2() {
    table2.innerHTML = "";
}

//funcion para recorrer el arbol en preorden y mostrarlo en la tabla
function recorrerArbolPreOrder(raiz) {
    if (raiz !== null) {
        // Crear una fila para el nodo actual
        let fila = document.createElement("tr");
        // Insertar las columnas con los valores del nodo
        fila.innerHTML = `
			<td>${raiz.user_student.usuario}</td>
			<td>${raiz.user_student.carnet}</td>
			<td>${raiz.user_student.password}</td>
			<td>${raiz.user_student.carpeta_raiz}</td>
		`;
        // Insertar la fila en la tabla
        table.appendChild(fila);
        // Recorrer el subárbol izquierdo
        recorrerArbolPreOrder(raiz.izquierdo);
        // Recorrer el subárbol derecho
        recorrerArbolPreOrder(raiz.derecho);
    }
}

//funcion para cerrar sesion
function cerrarSesion() {
    window.location.href = "../../../Code/Login/index.html";
}

function xdxdxd() {
    let hashhhhh = JSON.parse(window.localStorage.getItem("TablaHashhh"));
    console.log(hashhhhh);
    for (let i = 0; i < hashhhhh.tabla.length; i++) {
        if (hashhhhh.tabla[i] == null) {
            continue;
        }
        console.log(hashhhhh.tabla[i]);
        CarnetsDeHash.push(hashhhhh.tabla[i].carnet);
    }
    console.log(CarnetsDeHash);
    window.localStorage.setItem("CarnetsDeHash", JSON.stringify(CarnetsDeHash));
}



/*Función que verifica le entrada del admin y de los estudiantes */
// async function Loginn() {
//     let user = document.getElementById("useeer").value;
//     let pass = document.getElementById("passsword").value;
//     let ArbolenStorageLogin = JSON.parse(window.localStorage.getItem("TreeAVL"));
//     let hashhhhh2 = JSON.parse(window.localStorage.getItem("TablaHashhh"));
//     let passwordEncriptada = await sha256(pass);
//     let effect = VerificarEstudiante(user, passwordEncriptada, hashhhhh2);
//     let resultado = arbolBinarioAVL.VerificandoPasswordYCarnetDelArbol(ArbolenStorageLogin, user, pass);
//     let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || [];
//     let usuariActualdelArray = usuariosArray.find((usuario) => usuario.carnet == user);
//     try {
//         if (user == "admin" && pass == "admin") {
//             ruta buena en web
//             let rutaaaa = "../../../../../EDD_1S2023_PY_201900647/EDD_Proyecto1_Fase3/Code/Dashboard/examples/dashboard.html";
//             let rutaaaa = "../../../../EDD_Proyecto1_Fase3/Code/Dashboard/examples/dashboard.html";
//             console.log(rutaaaa);
//             window.location.href = rutaaaa;
//             window.alert("Bienvenido Admin");
//         } else if (!resultado) {
//             console.log("ArbolStorage: ", ArbolenStorageLogin);
//             console.log("Resultado: ", resultado);
//             if (usuariActualdelArray && usuariActualdelArray.carnet == resultado.carnet) {
//                 console.log("Usuario Actual: ", usuariActualdelArray);
//                 localStorage.setItem("usuarioActual", JSON.stringify(usuariActualdelArray));
//             } else {
//                 usuariosArray.push(resultado);
//                 localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
//                 localStorage.setItem("usuarioActual", JSON.stringify(resultado));
//                 usuariActualdelArray = resultado;
//             }




//             ruta buenta en web
//             let rutaax ="../../../../../EDD_1S2023_PY_201900647/EDD_Proyecto1_Fase3/Code/User/examples/user.html";

//             let rutaax = "../../../../EDD_Proyecto1_Fase3/Code/User/examples/user.html";
//             console.log(rutaax);
//             window.location.href = rutaax;
//             window.alert("Bienvenido Estudiante: " + resultado.nombre);
//         } else {
//             alert("Usuario o contraseña incorrecta");
//         }
//     } catch (error) {
//         alert(error);
//     }
// }

async function Loginn() {
    let user = document.getElementById("useeer").value;
    let pass = document.getElementById("passsword").value;
    let ArbolenStorageLogin = JSON.parse(window.localStorage.getItem("TreeAVL"));
    let hashhhhh2 = JSON.parse(window.localStorage.getItem("TablaHashhh"));
    let passwordEncriptada = await sha256(pass);
    let effect = VerificarEstudiante(user, passwordEncriptada, hashhhhh2);
    let resultado = arbolBinarioAVL.VerificandoPasswordYCarnetDelArbol(ArbolenStorageLogin, user, pass);
    let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuariActualdelArray = usuariosArray.find((usuario) => usuario.carnet == user);
    try {
        if (user == "admin" && pass == "admin") {
            // ruta buena en web
            // let rutaaaa = "../../../../../EDD_1S2023_PY_201900647/EDD_Proyecto1_Fase3/Code/Dashboard/examples/dashboard.html";
            let rutaaaa = "../../../../EDD_Proyecto1_Fase3/Code/Dashboard/examples/dashboard.html";
            console.log(rutaaaa);
            window.location.href = rutaaaa;
            window.alert("Bienvenido Admin");
        } else if (effect !== null) {
            console.log("Usuario encontrado en la tabla hash:", effect);


            // ruta buena en web
            // let rutaax ="../../../../../EDD_1S2023_PY_201900647/EDD_Proyecto1_Fase3/Code/User/examples/user.html";
            let rutaax = "../../../../EDD_Proyecto1_Fase3/Code/User/examples/user.html";
            console.log(rutaax);
            window.location.href = rutaax;
            window.alert("Bienvenido Estudiante: " + effect.nombre);
        } else if (resultado !== false) {
            console.log("ArbolStorage: ", ArbolenStorageLogin);
            console.log("Resultado: ", resultado);
            if (usuariActualdelArray && usuariActualdelArray.carnet == resultado.carnet) {
                console.log("Usuario Actual: ", usuariActualdelArray);
                localStorage.setItem("usuarioActual", JSON.stringify(usuariActualdelArray));
            } else {
                usuariosArray.push(resultado);
                localStorage.setItem("usuarios", JSON.stringify(usuariosArray));
                localStorage.setItem("usuarioActual", JSON.stringify(resultado));
                usuariActualdelArray = resultado;
            }

            //ruta buena en web
            // let rutaax ="../../../../../EDD_1S2023_PY_201900647/EDD_Proyecto1_Fase3/Code/User/examples/user.html";
            let rutaax = "../../../../EDD_Proyecto1_Fase3/Code/User/examples/user.html";
            console.log(rutaax);
            window.location.href = rutaax;
            window.alert("Bienvenido Estudiante: " + resultado);
        } else {
            alert("Usuario o contraseña incorrecta");
        }
    } catch (error) {
        alert(error);
    }
}

function agregarUsuario(usuario) {
    let usuariosArray = JSON.parse(localStorage.getItem("usuarios")) || []; // Obtener array de usuarios del localStorage
    let usuarioIndex = usuariosArray.findIndex(
        (u) => u.carnet === usuario.carnet
    ); // Buscar el índice del usuario en el array
    if (usuarioIndex === -1) {
        // Si el usuario no existe en el array, agregarlo
        usuariosArray.push(usuario);
    } else if (usuariosArray[usuarioIndex].usuarioActual !== true) {
        // Si el usuario ya existe en el array y no es el usuario actual, actualizarlo
        usuariosArray[usuarioIndex] = usuario;
    }
    localStorage.setItem("usuarios", JSON.stringify(usuariosArray)); // Guardar el array de usuarios en el localStorage
}

function getLocalStorageSize() {
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        size += key.length + value.length;
    }
    return size;
}

// function Loginn() {
//     let user = document.getElementById("useeer").value;
//     let pass = document.getElementById("passsword").value;
//     let ArbolenStorageLogin = JSON.parse(window.localStorage.getItem("TreeAVL"));
//     let resultado = arbolBinarioAVL.VerificandoPasswordYCarnetDelArbol(ArbolenStorageLogin, user, pass);
//     try {
//         console.log("ArbolStorage: ", ArbolenStorageLogin);
//         console.log("Resultado: ", resultado);

//         if (user == "admin" && pass == "admin") {
//             let ruta = "/EDD_Proyecto1_Fase2/Code/Dashboard/examples/dashboard.html";
//             window.location.href = ruta;
//             console.log(ruta);
//             alert("Bienvenido Admin");
//         } else if (resultado != false) {
//             let usuariosArray = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtener array de usuarios del localStorage
//             let usuarioIndex = usuariosArray.findIndex(usuario => usuario.carnet === resultado.carnet); // Buscar el índice del usuario en el array
//             if (usuarioIndex === -1) { // Si el usuario no existe en el array, agregarlo
//                 usuariosArray.push(resultado);
//             } else { // Si el usuario ya existe en el array, actualizarlo
//                 usuariosArray[usuarioIndex] = resultado;
//             }
//             console.log(usuariosArray);
//             localStorage.setItem('usuarios', JSON.stringify(usuariosArray)); // Guardar el array de usuarios en el localStorage
//             localStorage.setItem('usuarioActual', JSON.stringify(resultado));
//             let rutaa = "/EDD_Proyecto1_Fase2/Code/User/examples/user.html";
//             console.log(rutaa);
//             window.location.href = rutaa;
//             alert("Bienvenido Estudiante: " + resultado.nombre);
//         } else {
//             alert("Usuario o contraseña incorrecta")
//         }
//     } catch (error) {
//         alert(error)
//     }
// }

// Funcion para mostrar el nombre del usuario en el dashboard
function BienvenidaUser_student() {
    const usuarioActual = localStorage.getItem("usuarioActual");
    const user = JSON.parse(usuarioActual);
    const bienvenida = `¡Bienvenido ${user.carnet}!`;
    h4444.textContent = bienvenida;
}

// Funcon para seleccionaaaar el orden del arbol avl en lat  tablaaaa
function seleccionarOpcion() {
    const selectElement = document.getElementById("miSelect");
    const selectedOption =
        selectElement.options[selectElement.selectedIndex].value;
    switch (selectedOption) {
        case "opcion1":
            retonarDatosStorageInOrder();
            break;
        case "opcion2":
            retonarDatosStoragePre();
            break;
        case "opcion3":
            retonarDatosStoragePost();
            break;
        default:
            console.log("Opción no válida");
    }
}

// Funcion para mandar a llamar el reporte de mensajes
function seleccionaaaarrOpcion() {
    const selectElement = document.getElementById("miSelect2");
    const selectedOption =
        selectElement.options[selectElement.selectedIndex].value;
    switch (selectedOption) {
        case "opcion1":
            retonarDatosStorageInOrder();
            break;
        default:
            console.log("Opción no válida");
    }
}

//Funcion que migra los datos del avl en el localstorage a la tabla hash y la guarda en el localstorage
// async function ConvertAvlfromLocalStorageToTablaHash() {
//     let tablaHashhhhh = new TablaHash();
//     let arboolAVL = JSON.parse(localStorage.getItem("TreeAVL"));
//     let Nuevoavl = new ArbolAVL();
//     Nuevoavl.raiz = arboolAVL;
//     let nodosAVL = Nuevoavl.recorrerPorAmplitud();
//     console.log("Nodos del árbol AVL:", nodosAVL);
//     for (let i = 0; i < nodosAVL.length; i++) {
//         const password = await encriptarPassSha256(nodosAVL[i].user_student.password);
//         tablaHashhhhh.insertar(nodosAVL[i].user_student.carnet, nodosAVL[i].user_student.nombre, password, nodosAVL[i].user_student.arbolNario);
//     }
//     let TablaHashEnStorage = JSON.stringify(tablaHashhhhh);
//     localStorage.setItem("TablaHashhh", TablaHashEnStorage);

//     console.log("Tabla hash generada a partir del árbol AVL:", tablaHashhhhh);
// }


async function ConvertAvlfromLocalStorageToTablaHash() {
    try {
        const tablaHashhhhh = new TablaHash();
        const arbolAVL = JSON.parse(localStorage.getItem("TreeAVL"));
        if (!arbolAVL) {
            throw new Error("El árbol AVL en el almacenamiento local no existe o es inválido");
        }
        const nuevoAVL = new ArbolAVL();
        nuevoAVL.raiz = arbolAVL;
        const nodosAVL = nuevoAVL.recorrerPorAmplitud();
        console.log("Nodos del árbol AVL:", nodosAVL);
        for (let i = 0; i < nodosAVL.length; i++) {
            const password = await encriptarPassSha256(nodosAVL[i].user_student.password);
            tablaHashhhhh.insertar(
                nodosAVL[i].user_student.carnet,
                nodosAVL[i].user_student.nombre,
                password,
                nodosAVL[i].user_student.carpeta_raiz,
                nodosAVL[i].user_student.arbolNario,
                nodosAVL[i].user_student.listaDobleCircular
            );

        }
        const tablaHashEnStorage = JSON.stringify(tablaHashhhhh);
        window.localStorage.setItem("TablaHashhh", tablaHashEnStorage);
        window.localStorage.removeItem("TreeAVL");
        console.log("Tabla hash generada a partir del árbol AVL:", tablaHashhhhh);
    } catch (error) {
        console.error("Error en la conversión de AVL a Tabla Hash:", error);
    }
}
async function sha256(mensaje) {
    let cadenaFinal
    const enconder = new TextEncoder();
    const mensajeCodificado = enconder.encode(mensaje)
    await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then(result => { // 100 -> 6a 
            const hashArray = Array.from(new Uint8Array(result))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            cadenaFinal = hashHex
        })
        .catch(error => console.log(error))
    return cadenaFinal
}


async function encriptarPassSha256(password) {
    const paww = await sha256(password);
    return paww;

}


function VerificarEstudiante(carnet, password, tablaHashInLocalstorage) {
    console.log("Tabla hash en localstorage:", tablaHashInLocalstorage)
    console.log("Carnet:", carnet);
    console.log("Password:", password);
    if (tablaHashInLocalstorage != null) {
        for (let i = 0; i < tablaHashInLocalstorage.tabla.length; i++) {
            if (tablaHashInLocalstorage.tabla[i] == null) {
                continue;
            }
            if (tablaHashInLocalstorage.tabla[i].carnet == carnet && tablaHashInLocalstorage.tabla[i].password == password) {
                console.log("Estudiante encontrado:", tablaHashInLocalstorage.tabla[i]);
                const usuariogg = new user_student_hash(
                    tablaHashInLocalstorage.tabla[i].carnet,
                    tablaHashInLocalstorage.tabla[i].usuario,
                    tablaHashInLocalstorage.tabla[i].password,
                    tablaHashInLocalstorage.tabla[i].carpeta_raiz,
                    tablaHashInLocalstorage.tabla[i].arbolnnario,
                    tablaHashInLocalstorage.tabla[i].listaDobleCircular
                );
                console.log(usuariogg)
                window.localStorage.setItem("usuarioActual", JSON.stringify(usuariogg));
                return usuariogg;
            }
        }
    }
    else if (tablaHashInLocalstorage == null) {
        console.log("Tabla hash vacía");
        return null;
    }
}

//Funcion qeu crea el cuerpo de una tabla en html y agrega los atributos de la tabla hash
function GuardarenHashenTable(Tablahashsh) {
    if (Tablahashsh != null) {

        // Insertar las columnas con los valores del nodo
        for (let i = 0; i < Tablahashsh.tabla.length; i++) {
            let fila2 = document.createElement("tr");
            if (Tablahashsh.tabla[i] == null) {
                continue;
            }
            console.log(Tablahashsh.tabla[i])
            fila2.innerHTML = `
            <td>${Tablahashsh.tabla[i].usuario}</td>
            <td>${Tablahashsh.tabla[i].carnet}</td>
            <td>${Tablahashsh.tabla[i].password}</td>
            `;
            table3.appendChild(fila2);
        }

    } else {
        console.log("No hay nada en la tabla hash");
    }

}

/*funcion que llama la hash del localstorage y
crea un encabezado para la tabla y se concatena el cuerpo de la tabla en html*/
function TableHashinTable() {
    let Tablahashsh = JSON.parse(window.localStorage.getItem("TablaHashhh"));
    console.log("Tabla Hash: ", Tablahashsh);
    table3.appendChild(encabezado3);
    GuardarenHashenTable(Tablahashsh);
}

//funcion que crea el cuerpo de la tabla de permisos
function CuerpoTablaPermiso(ListaPermisos) {
    if (ListaPermisos != null) {
        // Insertar las columnas con los valores del nodo
        for (let i = 0; i < ListaPermisos.length; i++) {
            let fila4 = document.createElement("tr");
            if (ListaPermisos[i] == null) {
                continue;
            }
            fila4.innerHTML = `
            <td>${ListaPermisos[i].carnetPropetario}</td>
            <td>${ListaPermisos[i].carnetDestino}</td>
            <td>${ListaPermisos[i].ubicacion}</td>
            <td>${ListaPermisos[i].nombreArchivo}</td>
            <td>${ListaPermisos[i].tipoPermiso}</td>
            `;
            table4.appendChild(fila4);
        }
    } else {
        console.log("No hay nada en la tabla hash");
    }
}

function TablaPermisos() {
    let ListaPermisos = JSON.parse(window.localStorage.getItem("StudentsPermisos"));
    console.log("Lista Permisos: ", ListaPermisos);
    table4.appendChild(encabezado4);
    CuerpoTablaPermiso(ListaPermisos);
}

let Archivos = []

function ArchivosCompartidos() {
    let listaPermisos = JSON.parse(window.localStorage.getItem("StudentsPermisos"));
    let usuarioActual = JSON.parse(window.localStorage.getItem("usuarioActual"));
    let carnetActual = usuarioActual.carnet;
    console.log("Carnet Actual: ", carnetActual);
    console.log("Lista Permisos: ", listaPermisos);
    let archivosCompartidosEncontrados = false;
    tabla5.appendChild(encabezado5);
    for (let i = 0; i < listaPermisos.length; i++) {
        if (listaPermisos[i].carnetDestino == carnetActual) {
            console.log("Archivo compartido: ", listaPermisos[i].nombreArchivo);
            //.log("Archivo en base 64: ", listaPermisos[i].Archivoenbase64)
            let fila5 = document.createElement("tr");
            fila5.innerHTML = `
            <td>${listaPermisos[i].carnetPropetario}</td>
            <td>${listaPermisos[i].carnetDestino}</td>
            <td>${listaPermisos[i].ubicacion}</td>
            <td>${listaPermisos[i].nombreArchivo}</td>
            <td>${listaPermisos[i].tipoPermiso}</td>
            `;
            tabla5.appendChild(fila5);
            let nuevoPErmiso = new Permisoxd(listaPermisos[i].nombreArchivo, listaPermisos[i].Archivoenbase64)
            Archivos.push(nuevoPErmiso)
            archivosCompartidosEncontrados = true;
        }
    }
    convertirArchivos(Archivos);
    if (!archivosCompartidosEncontrados) {
        console.log("No hay archivos compartidos");
    }
}


function convertirArchivos(archivos) {
    const container = document.getElementById("uwu");
  
    archivos.forEach((archivo) => {
      const { nombre, contenido } = archivo;
      const extension = nombre.split('.').pop().toLowerCase();
  
      // Crear un contenedor para el archivo
      const fileContainer = document.createElement('div');
  
      // Agregar el nombre del archivo
      const nombreArchivoElement = document.createElement('h3');
      nombreArchivoElement.textContent = nombre;
      fileContainer.appendChild(nombreArchivoElement);
  
      if (extension === 'pdf') {
        // Crear un elemento <iframe> para visualizar el archivo PDF
        const iframe = document.createElement('iframe');
        iframe.src = `${contenido}`;
        iframe.style.width = '100%'; // Redimensionar el ancho del iframe
        iframe.style.height = '500px'; // Redimensionar el alto del iframe
        fileContainer.appendChild(iframe);
      } else if (extension.match(/(jpg|jpeg|png|gif)$/)) {
        // Crear un elemento <img> para mostrar la imagen
        const img = document.createElement('img');
        img.src = `${contenido}`;
        fileContainer.appendChild(img);
      } else if (extension === 'txt') {
        // Crear un elemento <textarea> para mostrar el contenido del archivo de texto
        const textarea = document.createElement('textarea');
        let nueva = contenido.split("base64,")[1];
        textarea.value = atob(nueva);
        textarea.style.width = '100%'; // Redimensionar el ancho del textarea
        textarea.style.height = '300px'; // Redimensionar el alto del textarea
        fileContainer.appendChild(textarea);
      }
  
      // Agregar el contenedor del archivo al contenedor principal
      container.appendChild(fileContainer);
    });
  }




//funcion  que  
function FuncionesOnload() {
    TableHashinTable();
    TablaPermisos();
}


function fechaActual() {
    let cadena = ''
    const fechaActual = new Date();
    cadena += fechaActual.getDate() < 10 ? ("0" + fechaActual.getDate() + "-") : (fechaActual.getDate() + "-")
    cadena += fechaActual.getMonth() < 10 ? ("0" + (fechaActual.getMonth() + 1) + "-") : (fechaActual.getMonth() + "-")
    cadena += fechaActual.getFullYear() + "::"
    cadena += fechaActual.getHours() < 10 ? ("0" + fechaActual.getHours() + ":") : (fechaActual.getHours() + ":")
    cadena += fechaActual.getMinutes() < 10 ? ("0" + fechaActual.getMinutes() + ":") : (fechaActual.getMinutes() + ":")
    cadena += fechaActual.getSeconds() < 10 ? ("0" + fechaActual.getSeconds()) : (fechaActual.getSeconds())
    return cadena

}




