# MANUAL TÉCNICO 🖥️
# FASE 1 DE PROYECTO DE ESTRUCTURA DE DATOS 1S 2023 📁

####  Nombre: Eduardo Jousué González Cifuentes
#### Carnet: 201900647

### CONTENIDO DEL MANUAL

- Introducción 
- Objetivos
- Dirigido
- Especificación Técnica
- Lógica del Programa


## Introducción 📝

>La aplicación EDD-GoDrive es un programa que sirve para leer archivos de entrada de tipo **csv** y hacer uso de  Tipos de dato abstracto (TDA) como lo son Listas doblemente enlazadas, colas, pilas. Con el fin de poder analizar la información y llevar un registro de usuarios y reportes de los mismos, se utilizó el lenguaje de programación llamado Golang específicamente en su version 1.20 y además de la herramienta para hacer reportes llamada Grapvhiz, mas adelante se explicara como funcionan los diferentes métodos que la componen de una manera lógica.


## Objetivos 📝
> - Dar a conocer las funciones a nivel interno del programa para que a otros desarrolladores se les haga fácil el entender el funcionamiento.
> - Así mismo dar a una herramienta más para el análisis de información de un archivo csv  y el poder manejar de la mejor manera la información analizada.

## Dirigido 📍

> Este manual va dirigido para todos los desarrolladores que estén interesados en analizar y aprender como se desarrolló esta aplicación.

## Especificación Técnica 💾

> **1. Requisitos de Hardaware**
>   - Computadora de escritorio o portátil.
>   - Mínimo 4gb de RAM.
>   - Procesador i-3 de 4ta generación en adelante.
>   - Mínimo 10 GB de almacenamiento en el Disco Duro. 

> **2. Requisitos de Software**
>   - Windows 7 o superior.
>   - Golang 1.20
>   - Graphviz
>   - Visual Estudio Code

## Lógica del Programa 💽

### Métodos y clases utilizadas para llevar a cabo el desarrollo de la aplicación 🔖

#### CLASES 📁

> - main.go
> - Estructuras
  >> - ColaStudentsPend.go
  >> - DoubleList.go
  >> - nodeCola.go
  >> - nodePilaAdmin.go
  >> - nodePilaStudent.go
  >> - nodestudent.go
  >> - PilaAdmin.go
  >> - PilaStudent.go
  >> - ReporteMain.go
  >> - student.go

##### main.go 📁

> En esta clase se desarrollo la mayoría de métodos que se desarrollaron para el funcionamiento 
##### importacion de librerias

```golang
import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
	"unicode"

	"golang.org/x/text/transform"
	"golang.org/x/text/unicode/norm"

	"Code/Structs"

)

```


##### main
```golang
func main() {
	option := 0
	out := false

	for !out {
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$:---- M E N U - EDD GoDrive ----:$")
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("$:       1. Iniciar Sesión       :$")
		fmt.Println("$:       2. Reportes             :$")
		fmt.Println("$:       3. Cerrar Sesión        :$")
		fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
		fmt.Println("")
		fmt.Scanln(&option)
		switch option {
		case 1:
			Login()
		case 2:
			menuReportes()
		case 3:
			fmt.Println("$:----    Cerrando sesión    ----:$")
			out = true
		}

	}

}
```

##### Login
```golang
func Login() {
	pass := ""
	user := ""
	fmt.Println("$:---------- L O G I N  ---------:$")
	fmt.Println("$: Ingrese su usario :$")
	fmt.Scanln(&user)
	fmt.Println("$: Ingrese su contraseña :$")
	fmt.Scanln(&pass)
	studenActual := ListaDobleGlobal.EstudianteVal(user, pass)
	if user == "admin" && pass == "admin" {
		fmt.Println("Bienvenido Admin :D ")
		menuAdmin()
	} else if studenActual != nil {
		menuStudent(studenActual.Carnet, studenActual.FirstName, studenActual.LastName)
		fmt.Println("Bienvenido ", studenActual.FirstName, " ", studenActual.LastName)

	} else {
		fmt.Println("Usuario o contraseña incorrecta :( ")
	}
}
```

##### Menu de administrador
```golang
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
			miniMenuPendientes()
		case 2:
			fmt.Println("Case 2")
			ListaDobleGlobal.MostrarConsola()
		case 3:
			fmt.Println("Case 3")
			agregarEstudiante()
		case 4:
			fmt.Println("Case 4")
			cargarMasivo()
		case 5:
			fmt.Println("Cerrando Sesión....")
			out = true
		}
	}
}
```

##### Menu de estudiante
```golang
func menuStudent(carnet string, first string, last string) {
	fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
	fmt.Println("$:-------  Student - EDD GoDrive --------:$")
	fmt.Println("$:_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _:$")
	fmt.Println("$: Se inició sesión correctamente :$")
	temporal := "El Estudiante:  \\n" + first + " " + last + "  \\n ha iniciado sesión \\n"
	ListaDobleGlobal.AgregarAPila(carnet, temporal+fecha())

}
```

##### Metodo para agregar estudiantes a la cola
```golang
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
```

##### Metodo que sirve para poder leer el archivo  **csv** y poder agregar a las respectivas listas dicha información
```golang
func cargarMasivo() {
	file, ferr := os.Open("Estudiante.csv")
	if ferr != nil {
		panic(ferr)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	if scanner.Scan() {
		fmt.Println("Ignoring first line: ", scanner.Text())
	}

	for scanner.Scan() {
		line := scanner.Text()
		t := transform.Chain(norm.NFD, transform.RemoveFunc(isMn), norm.NFC)
		result, _, _ := transform.String(t, line)

		items := strings.Split(result, ",")
		names := strings.Split(items[1], " ")

		//fmt.Println("Nombre: ", names[0], " Apellido: ", names[1], " Carnet: ", items[0], " Contraseña: ", items[2])
		nuevoStudent2 := &Structs.Student{FirstName: names[0], LastName: names[1], Carnet: items[0], Password: items[2]}
		ColaGlobal.Encolar(nuevoStudent2)
	}
	fmt.Println("$: Carga Masiva Exitosa   :D  :$")

}
```

##### Menú de reportes en graphviz
```golang
func menuReportes() {
	out := false
	op := 0
	for !out {
		fmt.Println("$:° ° ° ° °  R E P O R T E S  ° ° ° ° °:$")
		fmt.Println("$: 1. Reporte de estudiantes aceptados :$")
		fmt.Println("$: 2. Reporte de estudiantes en cola   :$")
		fmt.Println("$: 3. Reporte de Bitacora de admin     :$")
		fmt.Println("$: 4. Reporte de JSON                  :$")
		fmt.Println("$: 5. Regresar al menú principal       :$")
		fmt.Println("$: ° ° ° ° ° ° ° ° ° ° ° ° ° ° ° ° ° ° :$")
		fmt.Print("Ingrese su opcion: ")
		fmt.Scanln(&op)
		switch op {
		case 1:
			Structs.GraficarLD(ListaDobleGlobal.GraficarListaDobleConPila())
			fmt.Println("$: Realizando reporte de estudiantes aceptados... :$")
		case 2:
			ColaGlobal.Graficar()
			fmt.Println("$: Realizando reporte de estudiantes en cola... :$")
		case 3:
			PilaAdminGlobal.GraficarPilaAdmin()
			fmt.Println("$: Realizando reporte de bitácora de admin... :$")
		case 4:
			Structs.GenerarJson(ListaDobleGlobal)
			fmt.Println("$: Realizando reporte de JSON... :$")
		case 5:
			fmt.Println("$: Regresando al menú principal... :$")
			out = true
		}
	}
}
```

##### Menu donde se acpepta o rechaza a los estudiantes de la cola
```golang
func miniMenuPendientes() {
	out := false
	op := 0
	for !out {
		fmt.Println("$:° ° ° ° °  Pendientes : ", ColaGlobal.Longitud, "° ° ° ° °:$")
		fmt.Print("$: ")
		ColaGlobal.MostrarPrimero2()
		fmt.Println("$:° ° °   1. Aceptar Estudiante    ° ° °:$")
		fmt.Println("$:° ° °   2. Rechazar Estudiante   ° ° °:$")
		fmt.Println("$:° ° °   3. Volver al Menu        ° ° °:$")
		fmt.Println("$:° ° ° ° ° ° ° °  ° ° ° ° ° ° ° ° ° ° °:$")
		fmt.Println("$: Ingrese su opcion: ")
		fmt.Scanln(&op)
		switch op {
		case 1:
			PilaAdminGlobal.Puush("Se Aceptó al \n \\nEstudiante: " + ColaGlobal.MostrarPrimero().FirstName + " " + ColaGlobal.MostrarPrimero().LastName + "\\n" + fecha())
			//ListaDobleGlobal.InsertarOrdenado(ColaGlobal.MostrarPrimero())
			fmt.Println("$: Aceptando al Estudiante:  " + ColaGlobal.MostrarPrimero().FirstName + " " + ColaGlobal.MostrarPrimero().LastName + " :$")
			ListaDobleGlobal.InsertionOrdenado(ColaGlobal.MostrarPrimero())
			ColaGlobal.Descolar()
		case 2:
			PilaAdminGlobal.Puush("Se Rechazó al \n \\nEstudiante: " + ColaGlobal.MostrarPrimero().FirstName + " " + ColaGlobal.MostrarPrimero().LastName + "\\n" + fecha())
			fmt.Println("$: Rechazando al  Estudiante: " + ColaGlobal.MostrarPrimero().FirstName + " " + ColaGlobal.MostrarPrimero().LastName + " :$")
			ColaGlobal.Descolar()
		case 3:
			fmt.Println("$: Regresando al menú principal... :$")
			out = true
		}

	}

}
```


##### Método que se utiliza para poder obtener la fecha y la hora instantáneamente 
```golang
func fecha() string {
	tiempo := time.Now()
	fecha := ""
	hora := ""
	if tiempo.Hour() < 10 {
		hora = hora + "0" + strconv.Itoa(tiempo.Hour()) + ":"
	} else {
		hora = hora + strconv.Itoa(tiempo.Hour()) + ":"
	}
	if tiempo.Minute() < 10 {
		hora = hora + "0" + strconv.Itoa(tiempo.Minute()) + ":"
	} else {
		hora = hora + strconv.Itoa(tiempo.Minute()) + ":"
	}
	if tiempo.Second() < 10 {
		hora = hora + "0" + strconv.Itoa(tiempo.Second())
	} else {
		hora = hora + strconv.Itoa(tiempo.Second())
	}
	if tiempo.Day() < 10 {
		fecha = fecha + "0" + strconv.Itoa(tiempo.Day()) + "/"
	} else {
		fecha = fecha + strconv.Itoa(tiempo.Day()) + "/"
	}
	if tiempo.Month() < 10 {
		fecha = fecha + "0" + strconv.Itoa(int(tiempo.Month())) + "/"
	} else {
		fecha = fecha + strconv.Itoa(int(tiempo.Month())) + "/"
	}
	if tiempo.Year() < 10 {
		fecha = fecha + "0" + strconv.Itoa(tiempo.Year()) + " "
	} else {
		fecha = fecha + strconv.Itoa(tiempo.Year()) + " "
	}
	return "Fecha:" + fecha + "\nHora:" + hora
}
```


#####
```golang
```

