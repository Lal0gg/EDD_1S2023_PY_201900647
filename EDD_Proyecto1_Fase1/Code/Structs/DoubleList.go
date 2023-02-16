package Structs

import (
	"fmt"
)

type DoubleList struct {
	inicio   *NodeSt
	longitud int
}

func (l *DoubleList) isEmpty() bool {
	if l.longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *DoubleList) newNodo(studentt *Student) *NodeSt {
	return &NodeSt{studentt, nil, nil}
}

func (l *DoubleList) InsertarAlFinal(firstName string, lastName string, carnet int, password string) {
	newStudent := &Student{firstName, lastName, carnet, password}
	if l.isEmpty() {
		l.inicio = l.newNodo(newStudent)
		l.longitud++
	} else {
		aux := l.inicio
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		//  null <- 1 -> <- 2 -> nil
		aux.siguiente = l.newNodo(newStudent)
		aux.siguiente.anterior = aux
		l.longitud++
	}
}

func (l *DoubleList) MostrarConsola() {
	aux := l.inicio
	fmt.Println(" _ _ _ _ _ _ _ _ L I S T A _ E S T U D I A N T E S _ _ _ _ _ _ _ _")
	for aux != nil {
		fmt.Println("Nombre: ", aux.studentt.firstName, " ", aux.studentt.lastName, " Carnet: ", aux.studentt.carnet)
		fmt.Println(" _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ")
		aux = aux.siguiente
	}
}

func NewLista() *DoubleList {
	lista := new(DoubleList)
	lista.inicio = nil
	lista.longitud = 0
	return lista
}
