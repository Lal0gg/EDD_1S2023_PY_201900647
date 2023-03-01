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

