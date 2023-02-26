package Structs

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

func CrearArchivo(name string) {
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

func EscribirArchivo(contenido string, name string) {
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

func CrearArchivoJson() {
	var _, err = os.Stat("Archivo.json")
	if os.IsNotExist(err) {
		var file, err = os.Create("Archivo.json")
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", "Archivo.json")

}

func EscribirArchivoJson(contenido string) {
	var file, err = os.OpenFile("Archivo.json", os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}
