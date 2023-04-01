/*Función que verifica le entrada del admin y de los estudiantes */
function Loginn() {

    var user = document.getElementById("useeer").value;
    var pass = document.getElementById("passsword").value;
    if (user == "admin" && pass == "admin") {
        location.href = "../Dashboard/examples/dashboard.html";
        alert("Bienvenido");
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}


/*Clase de usuario de tipo estudiante */
class user_student {
    constructor(nombregg, carnetgg, passwordgg, carpetaRaizgg) {
        this.nombre = nombregg;
        this.carnet = carnetgg;
        this.password = passwordgg;
        this.carpeta_raiz = carpetaRaizgg;
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
        return raiz === null ? 0 : raiz.altura
    }

    Equilibrio(raiz) {
        return raiz === null ? 0 : (this.Altura(raiz.derecho) - this.Altura(raiz.izquierdo))
    }

    RotacionI(raiz) { // 2
        let raiz_derecho = raiz.derecho // 4
        let hijo_izquierdo = raiz_derecho.izquierdo // 3
        raiz_derecho.izquierdo = raiz // 2
        raiz.derecho = hijo_izquierdo // 3
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho))
        raiz_derecho.altura = 1 + Math.max(this.Altura(raiz_derecho.izquierdo), this.Altura(raiz_derecho.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho)
        return raiz_derecho
    }
    //this.raiz = 2
    RotacionD(raiz) {
        let raiz_izquierdo = raiz.izquierdo
        let hijo_derecho = raiz_izquierdo.derecho
        raiz_izquierdo.derecho = raiz
        raiz.izquierdo = hijo_derecho
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho))
        raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo), this.Altura(raiz_izquierdo.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo)
        return raiz_izquierdo
    }

    insertarValorHijo(nodo, raiz) {
        if (raiz === null) {
            raiz = nodo
        } else {
            if (raiz.user_student.carnet === nodo.user_student.carnet) {
                raiz.user_student.carnet = nodo.user_student.carnet
            } else if (raiz.user_student.carnet < nodo.user_student.carnet) {
                raiz.derecho = this.insertarValorHijo(nodo, raiz.derecho);
            } else {
                raiz.izquierdo = this.insertarValorHijo(nodo, raiz.izquierdo);
            }
        }
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho))
        let balanceo = this.Equilibrio(raiz) //(-2)
        raiz.factor_equilibrio = balanceo
        //Rotacion Simple a la Izquierda
        if (balanceo > 1 && nodo.user_student.carnet > raiz.derecho.user_student.carnet) {
            return this.RotacionI(raiz)
        }
        //Rotacion Simple a la Derecha
        if (balanceo < -1 && nodo.user_student.carnet < raiz.izquierdo.user_student.carnet) {
            return this.RotacionD(raiz)
        }
        //Rotacion Doble a la Izquierda
        if (balanceo > 1 && nodo.user_student.carnet < raiz.derecho.user_student.carnet) {
            raiz.derecho = this.RotacionD(raiz.derecho)
            return this.RotacionI(raiz)
        }
        //Rotacion Doble a la Derecha
        if (balanceo < -1 && nodo.user_student.carnet > raiz.izquierdo.user_student.carnet) {
            raiz.izquierdo = this.RotacionI(raiz.izquierdo)
            return this.RotacionD(raiz)
        }
        return raiz
    }

    PreOrdenAVL(raiz) {
        if (raiz !== null) {
            console.log(raiz.user_student)
            this.PreOrdenAVL(raiz.izquierdo)
            this.PreOrdenAVL(raiz.derecho)
        }
    }

    PostOrdenAVL(raiz){
        if(raiz !== null){
            this.PostOrdenAVL(raiz.izquierdo)
            this.PostOrdenAVL(raiz.derecho)
            console.log(raiz.user_student)
        }

    }

    InOrderAVL(raiz) {
        if (raiz != null) {
            this.InOrderAVL(raiz.izquierdo)
            console.log(raiz.user_student)
            this.InOrderAVL(raiz.derecho)
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
            cadena += "node[shape=ellipse,fixedsize=true,width=1,height=1,fontsize=\"5.5\",penwidth=2,fontname=\"Courier New\",style=\"filled\",fillcolor=\"deeppink\",fontcolor=\"darkolivegreen1\"]; \n";
            cadena = cadena + this.retornarValoresArbol(raiz, 0);
            cadena = cadena + "}";
        } else {
            cadena = "No hay valores en el arbol";
        }
        console.log(cadena)
        return cadena;
    }

    retornarValoresArbol(raiz, id) {
        var cadena = "";
        var numero = id + 1;
        console.log("La raiz", raiz)
        if (!(raiz === null)) {
            cadena += "\"";
            cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
            cadena += "\" ;\n";
            if (!(raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=\"invis\"];\n"
                cadena += "\"";
                cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + "\"" + raiz.izquierdo.user_student.nombre + " \\n" + raiz.izquierdo.user_student.carnet + " \\n" + "Altura: " + raiz.izquierdo.altura + "\"" + " -> " + "\"" + raiz.derecho.user_student.nombre + " \\n" + raiz.derecho.user_student.carnet + " \\n" + "Altura: " + raiz.derecho.altura + "\"" + " [style=\"invis\"]};\n "
            } else if (!(raiz.izquierdo === null) && (raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=\"invis\"];\\n"
                cadena += "\"";
                cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=\"invis\"]";
                cadena += "{rank=same" + "\"" + raiz.izquierdo.user_student.nombre + " \\n" + raiz.izquierdo.user_student.carnet + " \\n" + "Altura: " + raiz.izquierdo.altura + "\"" + " -> " + "x" + numero + " [style=\"invis\"]};\n "
            } else if ((raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=\"invis\"];\n"
                cadena += "\"";
                cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=\"invis\"]";
                cadena += "; \n\"";
                cadena += raiz.user_student.nombre + " \\n" + raiz.user_student.carnet + " \\n" + "Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.user_student.nombre + " \\n" + raiz.derecho.user_student.carnet + " \\n" + "Altura: " + raiz.derecho.altura + "\"" + " [style=\"invis\"]};\n"
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

}


const arbolBinarioAVL = new ArbolAVL();

function agregarVariosNumeros() {
    let valor = document.getElementById("valor").value;
    let valores = valor.split(',');
    try {
        valores.forEach((numero) => {
            arbolBinarioAVL.insertaValor(parseInt(numero))
        });
    } catch (error) {
        console.log(error)
    }
    refrescarArbol();
}

function limpiar() {
    arbolBinarioAVL.eliminarTodo();
    let url = 'https://quickchart.io/graphviz?graph=digraph G { arbol }';
    $("#image").attr("src", url);
    //document.getElementById("valor").value = "";
}

function refrescarArbol() {
    let ArbolenStorage = JSON.parse(window.localStorage.getItem('TreeAVL'));
    console.log(typeof ArbolenStorage);
    console.log("Arbol: ", ArbolenStorage)
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolBinarioAVL.grafica_arbol(ArbolenStorage);
    console.log(body)
    $("#image").attr("src", url + body);

    //document.getElementById("valor").value = "";
}


let table = document.getElementById("tablecarga");
const inputElement = document.getElementById("inputt");

inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    console.log(obj)
    for (var i = 0; i < obj.alumnos.length; i++) {
        let nombreTemp = obj.alumnos[i].nombre
        let carnetTemp = obj.alumnos[i].carnet
        let passwordTemp = obj.alumnos[i].password
        let carpetaRaizTemp = obj.alumnos[i].Carpeta_Raiz
        let UserTemp = new user_student(nombreTemp, parseInt(carnetTemp), passwordTemp, carpetaRaizTemp)
        arbolBinarioAVL.insertaValor(UserTemp)
    }
    localStorage.setItem("TreeAVL", JSON.stringify(arbolBinarioAVL.raiz));
    console.log(typeof arbolBinarioAVL.raiz);
    alert("Se cargo el archivo correctamente")

    console.log(arbolBinarioAVL.raiz)

}


function retonarDatosStoragePost() {
    let ArbolitoStorage = JSON.parse(window.localStorage.getItem('TreeAVL'));
    //console.log(typeof ArbolenStorage);
    //console.log("Arbol Post: ", ArbolenStorage)
    let PostOrden=arbolBinarioAVL.PostOrdenAVL(ArbolitoStorage);
    console.log("post: ",PostOrden);
    clinTable()
    recorrerArbolPostOrder(ArbolitoStorage);
}

function retonarDatosStoragePre() {
    let  ArbolitoStorage1 = JSON.parse(window.localStorage.getItem('TreeAVL'));
    // console.log(typeof ArbolenStorage);
    // console.log("Arbol Pre: ", ArbolenStorage)
    let PreOrden = arbolBinarioAVL.PreOrdenAVL(ArbolitoStorage1)
    console.log("Pre: ",PreOrden);
    clinTable();
    recorrerArbolPreOrder(ArbolitoStorage1);
}


function retonarDatosStorageInOrder() {
    let ArbolitoStorage2 = JSON.parse(window.localStorage.getItem('TreeAVL'));
    let inOrder = arbolBinarioAVL.InOrderAVL(ArbolitoStorage2)
    // console.log(typeof ArbolenStorage);
    // console.log("Arbol: ", ArbolenStorage)
    console.log("InOrder: ",inOrder);
    clinTable();
    recorrerArbolInOrder(ArbolitoStorage2);
}



function retonarDatosStorage() {
    let ArbolenStorage = JSON.parse(window.localStorage.getItem('TreeAVL'));
    console.log(typeof ArbolenStorage);
    console.log("Arbol: ", ArbolenStorage)
    clinTable();
    recorrerArbol(ArbolenStorage);
}




function recorrerArbolInOrder(raiz) {

	if (raiz !== null) {
        // Recorrer el subárbol izquierdo
		recorrerArbolInOrder(raiz.izquierdo);
		// Crear una fila para el nodo actual
		let fila = document.createElement('tr');
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

function recorrerArbolPostOrder(raiz) {
	if (raiz !== null) {
        // Recorrer el subárbol izquierdo
		recorrerArbolPostOrder(raiz.izquierdo);
		// Recorrer el subárbol derecho
		recorrerArbolPostOrder(raiz.derecho);
		// Crear una fila para el nodo actual
		let fila = document.createElement('tr');
        
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
function clinTable(){
    table.innerHTML = "";
}

function recorrerArbolPreOrder(raiz) {
	if (raiz !== null) {
		// Crear una fila para el nodo actual
		let fila = document.createElement('tr');
		// Insertar las columnas con los valores del nodo
		fila.innerHTML = `
			<td>${raiz.user_student.nombre}</td>
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




