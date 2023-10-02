

const celdas$$ = document.querySelectorAll("td")
const modal$$ = document.querySelector("#infoRiego")
const mostrarInputRiego$$ = document.querySelector("#mostrarInputRiego")
const horaInicio$$ = document.querySelector("#horaInicio")
const fechaRiego$$ = document.querySelector("#fechaRiego")
const encabFechas$$ = document.querySelector("#encab-fechas")

const fechas = ["LUN 25", "MAR 26", "MIÉ 27", "JUE 28", "VIE 29", "SAB 30", "DOM 01"]

const closeModal = () => {
    modal$$.style.display = 'none';
}

const mostrarDatosRiegoInput = (e) => {
    modal$$.style.display = 'flex';
    fechaRiego$$.innerHTML = e.target.id
    console.log(e.target.id)  
    


}



celdas$$.forEach((element) => {
    element.addEventListener('click', mostrarDatosRiegoInput)
});

// Genera los horarios de riego: desde 01:00 hasta 23:00
for (let hora = 1; hora <= 23; hora++) {

    horaInicio = hora.toString().padStart(2, '0') + ":00";
    const nuevaHora = document.createElement('option');
    nuevaHora.value = horaInicio;
    nuevaHora.text  = horaInicio;
    horaInicio$$.appendChild(nuevaHora)    
    // console.log(horaString); 

}
  
// Generar el encebezado con las fechas
// Recorrer el array for of
// Por cada fecha agregar un <th>, agrgarle text = valor del array(posicion)



for (let [index, fecha] of fechas.entries()) {

    console.log("index " > index);
    let encabFecha =  document.createElement('th');
    
    if (index == 0) {
        encabFecha.innerHTML = ""    
    } else {
        encabFecha.innerHTML = fecha
    }
    
    encabFechas$$.appendChild(encabFecha)
    
}



// let fechaActual = new Date();
// console.log(fechaActual)
// mostrarInputRiego$$.addEventListener('click', mostrarDatosRiegoInput)