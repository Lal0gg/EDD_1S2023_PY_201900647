package Structs

import (
	"fmt"
	"strconv"
)

type DoubleList struct {
	Inicio   *NodeSt
	Final    *NodeSt
	Longitud int
}

func (l *DoubleList) isEmpty() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *DoubleList) newNodo(studentt *Student) *NodeSt {
	return &NodeSt{studentt: studentt, siguiente: nil, anterior: nil, pila: &PilaStudent{Primero: nil, Longitud: 0}}
}

// func (l *DoubleList) InsertarAlFinal(newStudent *Student) {
// 	if l.isEmpty() {
// 		l.Inicio = l.newNodo(newStudent)
// 		l.Longitud++
// 	} else {
// 		aux := l.Inicio
// 		for aux.siguiente != nil {
// 			aux = aux.siguiente
// 		}
// 		aux.siguiente = l.newNodo(newStudent)
// 		aux.siguiente.anterior = aux
// 		l.Longitud++
// 	}
// }

func (l *DoubleList) InsertarOrdenado(newstudent *Student) {
	if l.isEmpty() {
		l.Inicio = l.newNodo(newstudent)
		l.Longitud++
	} else {
		aux := l.Inicio
		for aux.siguiente != nil && aux.studentt.Carnet < newstudent.Carnet {
			aux = aux.siguiente
		}
		if aux.studentt.Carnet < newstudent.Carnet {
			aux.siguiente = l.newNodo(newstudent)
			aux.siguiente.anterior = aux
			l.Longitud++
		} else {
			if aux.anterior == nil {
				l.Inicio = l.newNodo(newstudent)
				l.Inicio.siguiente = aux
				aux.anterior = l.Inicio
				l.Longitud++
			} else {
				aux.anterior.siguiente = l.newNodo(newstudent)
				aux.anterior.siguiente.siguiente = aux
				aux.anterior = aux.anterior.siguiente
				l.Longitud++
			}
		}
	}
}

func (l *DoubleList) InsertionOrdenado(newStudent *Student) {
	Nodito := l.newNodo(newStudent)
	if l.Inicio == nil {
		l.Inicio = Nodito
		l.Final = Nodito
		l.Longitud++
		return
	}
	if newStudent.Carnet < l.Inicio.studentt.Carnet {
		Nodito.siguiente = l.Inicio
		l.Inicio.anterior = Nodito
		l.Inicio = Nodito
		l.Longitud++
		return
	}
	noditoActual := l.Inicio

	for noditoActual.siguiente != nil && noditoActual.siguiente.studentt.Carnet < newStudent.Carnet {
		noditoActual = noditoActual.siguiente
	}

	if noditoActual.siguiente == nil {
		noditoActual.siguiente = Nodito
		Nodito.anterior = noditoActual
		l.Final = Nodito
		l.Longitud++
	} else {
		noditoSiguiente := noditoActual.siguiente
		noditoActual.siguiente = Nodito
		Nodito.anterior = noditoActual
		Nodito.siguiente = noditoSiguiente
		noditoSiguiente.anterior = Nodito
		l.Longitud++
	}

}

func (l *DoubleList) MostrarConsola() {
	aux := l.Inicio
	fmt.Println(" _ _ _ _ _ _ _ _ L I S T A _ E S T U D I A N T E S _ _ _ _ _ _ _ _")
	for aux != nil {
		fmt.Println("Nombre: ", aux.studentt.FirstName, " ", aux.studentt.LastName, " Carnet: ", aux.studentt.Carnet, "Pila: ", ContenidoPila(aux.pila))
		//fmt.Println(aux.studentt)
		fmt.Println(" _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ")
		aux = aux.siguiente
	}
}

func ContenidoPila(pila *PilaStudent) string {
	content := ""
	aux := pila.Primero
	if aux != nil {
		for aux != nil {
			content += " | " + aux.hora
			aux = aux.siguiente
		}
	} else {
		content = "|       |"
	}
	return content

}

func (l *DoubleList) EstudianteVal(carnet string, password string) *Student {
	aux := l.Inicio
	for aux != nil {
		if aux.studentt.Carnet == carnet && aux.studentt.Password == password {
			return aux.studentt
		}
		aux = aux.siguiente
	}
	return nil

}

func NewLista() *DoubleList {
	lista := new(DoubleList)
	lista.Inicio = nil
	lista.Longitud = 0
	return lista
}

func StructJson(lista *DoubleList) string {
	content := "{\n"
	content += "\t\"alumnos\": [\n"
	aux := lista.Inicio
	for aux.siguiente != nil {
		content += "\t\t{\n"
		content += "\t\t\t\"nombre\": " + "\"" + aux.studentt.FirstName + " " + aux.studentt.LastName + "\", \n"
		content += "\t\t\t\"carnet\": " + "\"" + aux.studentt.Carnet + "\", \n"
		content += "\t\t\t\"password\": " + "\"" + aux.studentt.Password + "\", \n"
		content += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
		content += "\t\t},\n"
		aux = aux.siguiente
	}

	content += "\t\t{\n"
	content += "\t\t\t\"nombre\": " + "\"" + aux.studentt.FirstName + " " + aux.studentt.LastName + "\", \n"
	content += "\t\t\t\"carnet\": " + "\"" + aux.studentt.Carnet + "\", \n"
	content += "\t\t\t\"password\": " + "\"" + aux.studentt.Password + "\", \n"
	content += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
	content += "\t\t}\n"
	content += "\t]\n"
	content += "}"
	return content

}

func (l *DoubleList) AgregarAPila(carnet string, hora string) {
	if l.Longitud == 0 {
		fmt.Println("No hay elementos")
	} else {
		aux := l.Inicio
		for i := 0; i < l.Longitud; i++ {
			if aux.studentt.Carnet == carnet {
				aux.pila.Push(hora)
				return
			}
			aux = aux.siguiente
		}
		fmt.Println("No se encontro el carnet :( ")
	}

}

func GenerarJson(lista *DoubleList) {
	contenido := StructJson(lista)
	CrearArchivoJson()
	EscribirArchivoJson(contenido)
}

func (l *DoubleList) GraficarListaDoble() string {

	texto := "digraph lista{\n"
	texto += "fontname=\"Courier New\";\n"
	texto += "fontsize=\"20pt\";\n"
	texto += "label = \"Reporte Estudiantes en el Sistema\";\n"
	texto += "bgcolor=\"paleturquoise\";\n"
	texto += "{rank=same;\n"
	texto += "node[shape=folder ,fontsize=\"20pt\",penwidth=4,fontname=\"Courier New\",style=\"filled\",fillcolor=\"lavenderblush1\" ]; \n"

	aux := l.Inicio
	aux2 := l.Inicio.pila.Primero
	for i := 0; i < l.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + " [label=\"" + aux.studentt.FirstName + " " + aux.studentt.LastName + " \\n " + aux.studentt.Carnet + "\"];\n"
		aux = aux.siguiente
	}

	for j := 0; j < l.Longitud-1; j++ {
		texto += "nodo" + strconv.Itoa(j) + "->nodo" + strconv.Itoa(j+1) + ";\n"
	}

	for k := 0; k < l.Longitud-1; k++ {
		texto += "nodo" + strconv.Itoa(k+1) + "->nodo" + strconv.Itoa(k) + ";\n"
	}

	texto += "{rank=same;\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape=record ,fontsize=\"20pt\",penwidth=4,fontname=\"Courier New\",style=\"filled\",fillcolor=\"lavenderblush1\" ]; \n"

	for m := 0; m < l.Longitud; m++ {
		texto += "nodeP" + strconv.Itoa(m) + "[label=\"" + "{"
		for n := 0; n < l.Inicio.pila.Longitud; n++ {
			texto = texto + "|" + aux2.hora

		}
		texto += "}\"]; \n"
		aux2 = aux2.siguiente
	}

	texto += "}"
	texto += "}"
	texto += "}"
	return texto
}

func GraficarLD(texto string) {

	nombre_archivo := "./ListaD.dot"
	nombre_imagen := "ListaD.jpg"
	CrearArchivo(nombre_archivo)
	EscribirArchivo(texto, nombre_archivo)
	execcute(nombre_imagen, nombre_archivo)
}
