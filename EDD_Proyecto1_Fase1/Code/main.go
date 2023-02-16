package main

import (
	"fmt"

	"Code/Structs"
)

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
			listaDoble := Structs.NewLista()
			listaDoble.InsertarAlFinal("Eduardo", "González", 201900647, "123xd")
			listaDoble.InsertarAlFinal("Piter", "Valiente", 201911666, "123xd")
			listaDoble.InsertarAlFinal("Kevin", "Palacios", 201988994, "123xd")
			listaDoble.InsertarAlFinal("Patricia", "Reyes", 201900369, "123xd")
			listaDoble.MostrarConsola()
		case 2:
			fmt.Println("$:----    Cerrando sesión    ----:$")
			out = true
		}

	}

}

func Login() {
	fmt.Println("$:---------- L O G I N  ---------:$")
	fmt.Println("$: Ingrese su usario :$")

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
		case 2:
			fmt.Println("Case 2")
		case 3:
			fmt.Println("Case 3")
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
