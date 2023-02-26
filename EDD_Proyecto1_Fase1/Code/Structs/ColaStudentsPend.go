package Structs

import (
	"fmt"
	"strconv"

)

type Cola struct {
	Primero  *NodeCola
	Ultimo   *NodeCola
	Longitud int
}

func (c *Cola) estaVacia() bool {
	if c.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(studennt *Student) {
	if c.estaVacia() {
		nuevoNodo := &NodeCola{studennt, nil}
		c.Primero = nuevoNodo
		c.Longitud++
	} else {
		nuevoNodo := &NodeCola{studennt, nil}
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		c.Longitud++
	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		c.Primero = c.Primero.siguiente
		c.Longitud--
	}
}

func (c *Cola) MostrarPrimero() *Student {
	newStudent := &Student{FirstName: "", LastName: "", Carnet: "", Password: ""}
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		newStudent = &Student{FirstName: c.Primero.studennt.FirstName, LastName: c.Primero.studennt.LastName, Carnet: c.Primero.studennt.Carnet, Password: c.Primero.studennt.Password}
		//fmt.Println("|Estudiante Actual : ", newStudent.FirstName, " ", newStudent.LastName+"   :$")
	}
	return newStudent
}

func (c *Cola) MostrarPrimero2() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		fmt.Println("|Estudiante Actual : ", c.Primero.studennt.FirstName, " ", c.Primero.studennt.LastName+"   :$")
	}
}

func (c *Cola) DesencolarNodo() *NodeCola {
	if c.Primero == nil {
		return nil
	}
	node := c.Primero
	c.Primero = c.Primero.siguiente
	if c.Primero == nil {
		c.Ultimo = nil
	}
	return node
}

func (c *Cola) MostrarCola() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		aux := c.Primero
		for aux != nil {
			fmt.Println("| Nombre: ", aux.studennt.FirstName, " Apellido: ", aux.studennt.LastName, "|\n|Carnet: ", aux.studennt.Carnet, "|\n Contraseña: ", aux.studennt.Password, "|")
			aux = aux.siguiente
		}

	}
}

func (c *Cola) Graficar() {
	nombre_archivo := "./cola.dot"
	nombre_imagen := "cola.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "bgcolor=\"darkturquoise\";\n"
	texto += "node[shape=folder,fontsize=\"20pt\",penwidth=4,fontname=\"Courier New\",fixedsize=true,width=5,height=1,style=\"filled\",fillcolor=\"lavenderblush1\"];\n"
	texto += "nodonull[label=\"null\"];\n"
	aux := c.Primero
	contador := 0
	for i := 0; i < c.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"" + "Nombre:" + aux.studennt.FirstName + " " + aux.studennt.LastName + "\nCarnet:" + aux.studennt.Carnet + "\"];\n"
		aux = aux.siguiente
	}
	for i := 0; i < c.Longitud-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + "[arrowsize=2.5,dir=both,arrowtail=dot,arrowhead= normal,color=\"black\",fillcolor=darkorchid2,label=\"             \"]" + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull[arrowsize=2.5,dir=both,arrowtail=dot,arrowhead= normal,color=\"black\",fillcolor=darkorchid2,label=\"             \"]" + ";\n"
	texto += "}"
	CrearArchivo(nombre_archivo)
	EscribirArchivo(texto, nombre_archivo)
	execcute(nombre_imagen, nombre_archivo)
}
