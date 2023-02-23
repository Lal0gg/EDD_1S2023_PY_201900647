package Structs

import "fmt"

type PilaStudent struct {
	Primero  *NodePilaStudent
	Longitud int
}

func (p *PilaStudent) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *PilaStudent) Push(hora string) {
	if p.estaVacia() {
		nuevoNodo := &NodePilaStudent{hora, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodePilaStudent{hora, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *PilaStudent) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no contiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Longitud--
	}
}
