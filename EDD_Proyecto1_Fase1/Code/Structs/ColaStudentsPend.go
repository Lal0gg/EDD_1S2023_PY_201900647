package Structs

import (
	"fmt"
)

type Cola struct {
	Primero  *NodeCola
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
		fmt.Println("| Nombre: ", c.Primero.studennt.FirstName, " ", c.Primero.studennt.LastName, "|\n|Carnet: ", c.Primero.studennt.Carnet, "|\n Ha sido agregado a la cola: ")
	}
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
