package Structs

import (
	"fmt"
)

type DoubleList struct {
	Inicio   *NodeSt
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
	return &NodeSt{studentt, nil, nil}
}

func (l *DoubleList) InsertarAlFinal(firstName string, lastName string, carnet string, password string) {
	newStudent := &Student{firstName, lastName, carnet, password}
	if l.isEmpty() {
		l.Inicio = l.newNodo(newStudent)
		l.Longitud++
	} else {
		aux := l.Inicio
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		//  null <- 1 -> <- 2 -> nil
		aux.siguiente = l.newNodo(newStudent)
		aux.siguiente.anterior = aux
		l.Longitud++
	}
}

func (l *DoubleList) MostrarConsola() {
	aux := l.Inicio
	fmt.Println(" _ _ _ _ _ _ _ _ L I S T A _ E S T U D I A N T E S _ _ _ _ _ _ _ _")
	for aux != nil {
		fmt.Println("Nombre: ", aux.studentt.FirstName, " ", aux.studentt.LastName, " Carnet: ", aux.studentt.Carnet)
		fmt.Println(" _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ")
		aux = aux.siguiente
	}
}

func (l *DoubleList) validarStudent(carnet string, password string) *Student {
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
