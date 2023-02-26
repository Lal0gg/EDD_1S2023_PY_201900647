package Structs

import (
	"fmt"
)

type PilaAdmin struct {
	Primero  *NodePilaAdmin
	Longitud int
}

func (p *PilaAdmin) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *PilaAdmin) Puush(hora string) {
	if p.estaVacia() {
		nuevoNodo := &NodePilaAdmin{hora, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodePilaAdmin{hora, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *PilaAdmin) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.hora)
	}
}

func (p *PilaAdmin) MostrarPila() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		aux := p.Primero
		for aux != nil {
			fmt.Println(aux.hora + "\n")
			aux = aux.siguiente
		}
	}
}

func (p *PilaStudent) Poop() {
	if p.estaVacia() {
		fmt.Println("La pila no contiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Longitud--
	}
}

func (p *PilaAdmin) GraficarPilaAdmin() {
	nombre_archivo := "./pilaAdmin.dot"
	nombre_imagen := "pilaAdmin.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=TB;\n"
	texto += "fontname=\"Courier New\";\n"
	texto += "label = \"Pila de Administradores\";\n"
	texto += "bgcolor=\"turquoise4\";\n"
	texto += "node[shape=record ,fontsize=\"20pt\",penwidth=4,fontname=\"Courier New\",style=\"filled\",fillcolor=\"darkseagreen1\" ];\n"
	aux := p.Primero
	texto += "node0[label=\"" + "{"
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|" + aux.hora
		aux = aux.siguiente
	}
	texto += "}\"]; \n}"
	CrearArchivo(nombre_archivo)
	EscribirArchivo(texto, nombre_archivo)
	execcute(nombre_imagen, nombre_archivo)
}
