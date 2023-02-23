package Structs

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
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

func (c *Cola) MostrarPrimero() {
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

func CrearArchivoCola(name string) {
	var _, err = os.Stat(name)
	if os.IsNotExist(err) {
		var file, err = os.Create(name)
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado con éxito: ", name)

}

func EscribirArchivoCola(contenido string, name string) {
	var file, err = os.OpenFile(name, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado con éxito:")

}

func execcute(name_img string, file_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tpng", file_dot, name_img).Output()
	mode := 0777
	_ = ioutil.WriteFile(name_img, cmd, os.FileMode(mode))
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
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull[arrowsize=2.5,dir=both,arrowtail=dot,arrowhead= normal,color=\"black\",fillcolor=darkorchid2,label=\"             \"];\n"
	texto += "}"
	CrearArchivoCola(nombre_archivo)
	EscribirArchivoCola(texto, nombre_archivo)
	execcute(nombre_imagen, nombre_archivo)
}
