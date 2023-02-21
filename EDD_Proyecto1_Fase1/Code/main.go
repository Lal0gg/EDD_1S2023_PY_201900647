package main

import (
	"fmt"

	"Code/Structs"
)

var ColaGlobal *Structs.Cola = &Structs.Cola{Primero: nil, Longitud: 0}
var ListaDobleGlobal *Structs.DoubleList = &Structs.DoubleList{Inicio: nil, Longitud: 0}

func main() {
	option := 0
	out := false

	for !out {
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$:---- M E N U - EDD GoDrive ----:$")
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$:       1. Iniciar Sesión       :$")
		fmt.Println("$:       2. Cerrar Sesión        :$")
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("")
		fmt.Scanln(&option)
		switch option {
		case 1:
			menuAdmin()
		case 2:
			fmt.Println("$:----    Cerrando sesión    ----:$")
			out = true
		}

	}

}

func Login() {
	pass := ""
	user := ""
	fmt.Println("$:---------- L O G I N  ---------:$")
	fmt.Println("$: Ingrese su usario :$")
	fmt.Scanln(&user)
	fmt.Println("$: Ingrese su contraseña :$")
	fmt.Scanln(&pass)
	//studenActual := ListaDobleGlobal.validarStudent(user, pass)
	if user == "admin" && pass == "admin" {
		menuAdmin()
	} //else if studenActual != nil {
	//	fmt.Println("Bienvenido ", studenActual.FirstName, " ", studenActual.LastName)
	//} else {
	//	fmt.Println("Usuario o contraseña incorrecta")
	//}

}

func menuAdmin() {
	out := false
	op := 0
	for !out {
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$:---- Dashboard Admin - EDD GoDrive ----:$")
		fmt.Println("$:------------ O P T I O N S ------------:$")
		fmt.Println("$:     1. Ver Estudiantes Pendientes     :$")
		fmt.Println("$:     2. Ver Estudiantes Del Sistema    :$")
		fmt.Println("$:     3. Registrar Nuevo Estudiante     :$")
		fmt.Println("$:     4. Carga Masiva de Estudiantes    :$")
		fmt.Println("$:     5. Cerrar Sesión                  :$")
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("")
		fmt.Println("$:_          Ingrese su Opción          _:$")
		fmt.Scanln(&op)
		switch op {
		case 1:
			fmt.Println("Case 1")
			ColaGlobal.MostrarPrimero()
		case 2:
			fmt.Println("Case 2")
		case 3:
			fmt.Println("Case 3")
			agregarEstudiante()
		case 4:
			fmt.Println("Case 4")
		case 5:
			fmt.Println("Cerrando Sesión....")
			out = true
		}
	}
}

func menuStudent() {
	out := false
	for !out {
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$:-------  Student - EDD GoDrive --------:$")
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$: Se inició sesión correctamente :$")
	}
}

func agregarEstudiante() {
	fmt.Println("$:----  Agregar Estudiante  ----:$")
	fmt.Println("$: Ingrese su usario :$")
	firstName := ""
	lastName := ""
	carnet := ""
	password := ""
	fmt.Println("Ingrese nombre")
	fmt.Scanln(&firstName)
	fmt.Println("Ingrese apellido")
	fmt.Scanln(&lastName)
	fmt.Println("Ingrese carnet")
	fmt.Scanln(&carnet)
	fmt.Println("Ingrese contraseña")
	fmt.Scanln(&password)
	nuevoStudent := &Structs.Student{FirstName: firstName, LastName: lastName, Carnet: carnet, Password: password}
	ColaGlobal.Encolar(nuevoStudent)

}
