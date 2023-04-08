/*Clase de usuario de tipo estudiante */
class user_student {
    constructor(nombregg, carnetgg, passwordgg, carpetaRaizgg) {
        this.nombre = nombregg;
        this.carnet = carnetgg;
        this.password = passwordgg;
        this.carpeta_raiz = carpetaRaizgg;
        this.arbolNario = new ArbolNArio();
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


}



//Clase del Nodo del Arbol N-ario
class nodoArbolN{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
        this.matriz = new MatrizDispersa();
    }
}

/*Clase del Arbol N-ario */
class ArbolNArio{
    constructor(){
        this.raiz = new nodoArbolN("/", 0)
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta){
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            while(aux){
                if(aux.valor === carpeta_nueva){
                    return 1
                }
                aux = aux.siguiente
            }
            return 2
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return 5
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return 3
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                aux = aux.primero
                while(aux){
                    if(aux.valor === carpeta_nueva){
                        return 1
                    }
                    aux = aux.siguiente
                }
                return 2
            }else{
                return 4
            }

        }
    }
    //Funcion solo para ordenar la lista de hijos cuando el padre posee varios hijos
    insertarOrdenado(raiz, nuevoNodo){
        let piv = raiz.primero
        if(nuevoNodo.valor < raiz.primero.valor){
            nuevoNodo.siguiente = raiz.primero
            raiz.primero = nuevoNodo
            return raiz
        }else{
            while(piv.siguiente){
                if( nuevoNodo.valor > piv.valor && nuevoNodo.valor < piv.siguiente.valor){
                    nuevoNodo.siguiente = piv.siguiente
                    piv.siguiente = nuevoNodo
                    return raiz
                }else if(nuevoNodo.valor < piv.valor){
                    nuevoNodo.siguiente = piv
                    piv =  nuevoNodo
                    return raiz
                }else{
                    piv = piv.siguiente
                }
            }
            piv.siguiente = nuevoNodo
            return raiz
        }
    }
    // /usac/prueba -> prueba1 /usac/prueba(prueba1)
    insertarHijos(carpeta_nueva, lista_carpeta){
        /**
         * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
         */
        const nuevoNodo = new nodoArbolN(carpeta_nueva, this.nodo_creados)
        this.nodo_creados++
        //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
        if(lista_carpeta[1] === "" && this.raiz.primero === null){
            this.raiz.primero = nuevoNodo
        }
        //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
        else if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo)
        }
        //Corroboramos si la insercion es en algun directorio que no es la raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){ 
                            posicion++
                            //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
            if(aux.primero === null){
                aux.primero = nuevoNodo
            }else{
                aux = this.insertarOrdenado(aux, nuevoNodo)
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
    insertarValor(ruta, carpeta_nueva){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
        switch(existe_carpeta){
            case 1:
                alert("La carpeta ya existe")
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
            case 3:
                alert("La ruta actual no existe")
                break;
            case 4:
                alert("La ruta actual no es valida")
                break;
            case 5:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
        }
    }

    grafica_arbol(raiz){
        var cadena = "";
        if(!(raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(raiz);
            cadena = cadena + "}";
        }else{
            cadena = "digraph G { arbol }";
        }
        console.log(cadena)
        return cadena;
    }

    /** le mando el parametro primero y solo recorre los siguientes*/
    retornarValoresArbol(raiz){
        var cadena = "node[shape=folder ,fontsize=\"10pt\",penwidth=2,fontname=\"Courier New\",style=\"filled\",fillcolor=\"lightslateblue\",fontcolor=\"whitesmoke\"] ";
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + "[label=\"" + raiz.valor  + "\"] "
        cadena += this.valoresSiguietes(raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(raiz.primero, 0)
        return cadena;
    }


    valoresSiguietes(raiz, nodo, nodo_padre){
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor  + "\"] "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    conexionRamas(raiz, padre){
        let cadena = ""
        let aux = raiz
        if(aux !== null){
            while(aux){
                cadena += "nodo" + padre + " -> nodo" + aux.id + " "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                cadena += this.conexionRamas(aux.primero, aux.id)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    /** Modificacion 30/03/2023 */
    BuscarCarpetaV2(lista_carpeta){
        //Directorio Actual seria la Raiz
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            return this.raiz
        }
        //Directorio Actual seria Raiz pero no contiene elementos
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return null
        }
        //Actual no es raiz pero tampoco hay elementos en raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return null
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                return aux
            }else{
                return null
            }

        }
    }

    mostrarCarpetasActuales(ruta){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta)
        try{
            if(existe_carpeta !== null){
                let aux = existe_carpeta.primero
                while(aux){
                    console.log(aux.valor)
                    aux = aux.siguiente
                }
            }
        }catch(error){
            console.log("Hubo un error")
        }
    }
}

//Clase Nodo para la Matriz Dispersa
class nodoMatrizDispersa{
    constructor(posX, posY, nombre_archivo){
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
    }
}


//Clase Matriz Dispersa
class MatrizDispersa{
    constructor(){
        this.principal = new nodoMatrizDispersa(-1,-1,"Raiz")
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }

    buscarF(nombre_archivo){
        let aux = this.principal
        while(aux){
            /**if(aux.posY === y) */
            if(aux.posicion === nombre_archivo){
                return aux;
            }else{
                aux = aux.abajo;
            }
        }
        return null;
    }

    buscarC(carnet){
        let aux = this.principal;
        while(aux){
            /**if(aux.posX === x) */
            if(aux.posicion === carnet){
                return aux;
            }else{
                aux = aux.siguiente
            }
        }
        return null;
    }

    insertarColumna(posicion,texto){
        const nuevoNodo = new nodoMatrizDispersa(posicion,-1,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.siguiente){
            if(nuevoNodo.posX > piv.posX){
                pivA = piv;
                piv = piv.siguiente
            }else{
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

    insertarFila(posicion,texto){
        const nuevoNodo = new nodoMatrizDispersa(-1,posicion,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.abajo){
            if(nuevoNodo.posY > piv.posY){
                pivA = piv;
                piv = piv.abajo;
            }else{
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
    
    insertarNodo(x,y,texto){
        const nuevoNodo = new nodoMatrizDispersa(x,y,texto);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while(tempX.siguiente){
            if(tempX.posX === nuevoNodo.posX){
                break;
            }
            tempX = tempX.siguiente;
        }
        while(true){
            if(tempX.posY === nuevoNodo.posY){
                break;
            }else if(tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY){
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            }else if(tempX.abajo === null){
                nuevoNodo.arriba = tempX
                nuevoNodo.abajo = tempX.abajo
                tempX.abajo = nuevoNodo;
                break;
            }else{
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while(tempY.abajo){
            if(tempY.posY === nuevoNodo.posY){
                break;
            }
            tempY = tempY.abajo;
        }
        while(true){
            if(tempY.posX === nuevoNodo.posX){
                break;
            }else if(tempY.siguiente !== null && tempY.siguiente.posX > nuevoNodo.posX){
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            }else if(tempY.siguiente === null){
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            }else{
                tempY = tempY.siguiente;
            }
        }
    }

    insertarElemento(x,y){
        let texto = x + "," + y;
        let nuevaFila = this.buscarF(y);
        let nuevaColumna = this.buscarC(x);
        /** Fila y Columna no existen */
        if(nuevaFila === null && nuevaColumna === null){
            this.insertarColumna(x, "C"+x);
            this.insertarFila(y, "F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila === null && nuevaColumna !== null){ /* Fila no existe, Columna si existe */
            this.insertarFila(y,"F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna === null){/* Fila si existe, Columna no existe */
            this.insertarColumna(x, "C"+x);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna !== null){/* Fila si existe, Columna si existe */
            this.insertarNodo(x,y,texto);
        }else{
            console.log("Me dio Ansiedad :(");
        }
    }

    insertarArchivo(texto, numero){
        let nuevaFila = this.buscarF(texto)
        if(nuevaFila === null){
            this.insertarFila(this.coordenadaY,texto)
            this.coordenadaY++
        }else{
            let copia_archivo = "(" + (numero++) + ")" + nombreArchivo
            this.insertarArchivo(copia_archivo, numero)
        }
    }

    colocarPermiso(archivo, carnet, permisos){
        /** NOTA: Paso Previo Buscar en AVL si existe el carnet*/
        let nuevaColumna = this.buscarC(carnet)
        let nuevaFila = this.buscarF(archivo)
        if(nuevaColumna === null){
            this.insertarColumna(this.coordenadaX, carnet)
            this.coordenadaX++
            nuevaColumna = this.buscarC(carnet)
        }
        if(nuevaColumna !== null && nuevaFila !== null){
            this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, permisos)
        }
    }

    reporte(){
        let cadena = "";
        let aux1 = this.principal;
        let aux2 = this.principal;
        let aux3 = this.principal;
        if(aux1 !== null){
            cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while(aux1){
                cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,rankdir=LR,group=" + (aux1.posX+1) + "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            while(aux2){
                aux1 = aux2;
                cadena += "{rank=same; ";
                while(aux1){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,group=" + (aux1.posX+1) + "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.siguiente){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.siguiente.posX+1) + (aux1.siguiente.posY+1) + " [dir=both];"
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.abajo){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.abajo.posX+1) + (aux1.abajo.posY+1) + " [dir=both];"
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena +=  "}";
        }else{
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }
}

//Creacion Maatriz Dispersa
const matriz = new MatrizDispersa()

function reporteMatriz(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = matriz.reporte();
    $("#image").attr("src",url+body)
}

function cargarArchivo(){
    matriz.insertarArchivo(nombreArchivo,1)
    reporteMatriz();
}

function asignarPermisos(){
    let cadena = document.getElementById("permiso").value
    let arreglo = cadena.split('-')
    matriz.colocarPermiso(arreglo[0],arreglo[1],arreglo[2])
    reporteMatriz()
}




// creacion arbol n-ario
const arbolnario = new ArbolNArio()
function agregarVarios(){
    const usuarioActuaaal = JSON.parse((localStorage.getItem('usuarioActual')));
    console.log("Usuario Actual: ", usuarioActuaaal)
    let ruta = document.getElementById("rutaCarpeta").value
    let carpeta = document.getElementById("NombreCarpeta").value
    console.log("Ruta: " + ruta)
    console.log("Carpeta: " + carpeta)
    try{
        arbolnario.insertarValor(ruta,carpeta)
        usuarioActuaaal.arbolNario = arbolnario
        console.log("Arbol Nnnario:", arbolnario)
        console.log("Se inserto el nodo correctamente")
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActuaaal));
    }catch(error){
        alert("Hubo un error al insertar el nodo")
    }
    document.getElementById("NombreCarpeta").value = ""; 

}

function refrescarArbolNario(){
    let usuarioActuaaal = JSON.parse((localStorage.getItem('usuarioActual')));
    console.log("Usuario Actual: ", usuarioActuaaal)
    let arbolNario = usuarioActuaaal.arbolNario.raiz
    console.log( "Arbol Nario: ", arbolNario)
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolnario.grafica_arbol(arbolNario);
    $("#imageNario").attr("src", url + body);
    document.getElementById("NombreCarpeta").value = "";
}

function mostraCarpetas(){
    let ruta = document.getElementById("ruta").value
    arbolnario.mostrarCarpetasActuales(ruta)
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

//funcion para limpiar el arbol
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

// variables para la tabla de la carga masiva
let table = document.getElementById("tablecarga");
let encabezado = document.createElement("thead");
encabezado.classList.add("text-primary");
encabezado.innerHTML = `
    <th>Nombre</th> 
    <th>Carnet</th>
    <th>Contraseña</th>
    <th>Carpeta Raiz</th>
    `;
const inputElement = document.getElementById("inputt");
let h4444 = document.getElementById("welcomeeeee");
inputElement.addEventListener("change", onChange, false);


// funcion para leer el archivo json
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}


// funcion para cargar el archivo json
function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    console.log(obj);
    for (var i = 0; i < obj.alumnos.length; i++) {
        let nombreTemp = obj.alumnos[i].nombre;
        let carnetTemp = obj.alumnos[i].carnet;
        let passwordTemp = obj.alumnos[i].password;
        let carpetaRaizTemp = obj.alumnos[i].Carpeta_Raiz;
        let UserTemp = new user_student(
            nombreTemp,
            parseInt(carnetTemp),
            passwordTemp,
            carpetaRaizTemp
        );
        arbolBinarioAVL.insertaValor(UserTemp);
    }
    localStorage.setItem("TreeAVL", JSON.stringify(arbolBinarioAVL.raiz));
    console.log(typeof arbolBinarioAVL.raiz);
    alert("Se cargo el archivo correctamente");

    console.log(arbolBinarioAVL.raiz);
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
    console.log("InOrder: ", typeof ArbolitoStorage2,ArbolitoStorage2);
    
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

//funcion para recorrer el arbol en preorden y mostrarlo en la tabla
function recorrerArbolPreOrder(raiz) {
    if (raiz !== null) {
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
        // Recorrer el subárbol izquierdo
        recorrerArbolPreOrder(raiz.izquierdo);
        // Recorrer el subárbol derecho
        recorrerArbolPreOrder(raiz.derecho);
    }
}



/*Función que verifica le entrada del admin y de los estudiantes */
function Loginn() {
    let user = document.getElementById("useeer").value;
    let pass = document.getElementById("passsword").value;
    let ArbolenStorageLogin = JSON.parse(window.localStorage.getItem("TreeAVL"));
    let resultado = arbolBinarioAVL.VerificandoPasswordYCarnetDelArbol(ArbolenStorageLogin, user, pass);
    try{
    console.log("ArbolStorage: ", ArbolenStorageLogin);
    console.log("Resultado: ", resultado);
    if (user == "admin" && pass == "admin") {
        let ruta = "/EDD_Proyecto1_Fase2/Code/Dashboard/examples/dashboard.html";
        window.location.href = ruta;
        console.log(ruta);
        alert("Bienvenido Admin");
        
    }else if(resultado != false){
        localStorage.setItem('usuarioActual', JSON.stringify(resultado));
        let rutaa = "/EDD_Proyecto1_Fase2/Code/User/examples/user.html";
        console.log(rutaa);
        window.location.href = rutaa;
        alert("Bienvenido Estudiante: " + resultado.nombre);
    }
    else {
        alert("Usuario o contraseña incorrecta")
    }
    }catch(error){
        alert(error)
    }
    
}

// Funcion para mostrar el nombre del usuario en el dashboard
function BienvenidaUser_student(){
    const usuarioActual = (localStorage.getItem('usuarioActual'));
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
