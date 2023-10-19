import { obtenerFechaActual, obtenerSemana } from './modules/fechas.js';
import {informarEventos} from './modules/calendar.js'

const celdas$$ = document.querySelectorAll("td")
const modal$$ = document.querySelector("#infoRiego")
const mostrarInputRiego$$ = document.querySelector("#mostrarInputRiego")

const horaInicio$$ = document.querySelector("#horaInicio")
const horaFin$$ = document.querySelector("#horaFin")

const fechaRiego$$ = document.querySelector("#fechaRiego")
const tbCalendar$$ = document.querySelector("#tb-calendar")
const encabFechas$$ = document.querySelector("#encab-fechas")

const formRiego$$ = document.querySelector("#formRiego")

let calendario = [
    
    { fecha: '16-10-2023', titulo: 'Riego Patatas', horaInicio: '01:00', horaFinal: '04:00' }, 

    { fecha: '18-10-2023', titulo: 'Riego Tomates', horaInicio: '08:00', horaFinal: '12:00' },

    { fecha: '22-10-2023', titulo: 'Riego Tomates', horaInicio: '16:00', horaFinal: '21:00' },

]



class Riego {
    constructor(fecha, titulo, horaInicio, horaFinal) {
      this.fecha = fecha;
      this.titulo = titulo;
      this.horaInicio = horaInicio;
      this.horaFinal = horaFinal;
    }
  }
  
  




const closeModal = () => {
    modal$$.style.display = 'none';
}

const mostrarDatosRiegoInput = (e) => {
    
    modal$$.style.display = 'flex';
    fechaRiego$$.innerHTML = e.target.id
     
    

}

const grabarRiego = (e) => {
    e.preventDefault();

    // LUN-09-09

    let diaMes = fechaRiego$$.innerHTML.substring(4,9)
    let fechaRiego = diaMes + '-' + year

    

    console.log(fechaRiego$$.innerHTML)

    let titulo = e.target.titulo.value
    let horaInicio = e.target.horaInicio.value
    let horaFin = e.target.horaFin.value
    
    let nuevoRiego = new Riego(fechaRiego, titulo, horaInicio, horaFin)      
    
    calendario = [...calendario,  nuevoRiego]   

    console.log(calendario)
    
    
    // Cierra el modal y vuelve al Calendario. 
    closeModal()

    informarEventos(calendario)

}

// Genera array con las horas desde 01:00 hasta 23:00
const generarHorasDia = () => {
    
    let horasDias = [];
    
    for (let hora = 1; hora <= 23; hora++) {
        let horadia = hora.toString().padStart(2, '0') + ":00"
        horasDias.push (horadia)
    }

    return horasDias;
}




  
// Generar el encebezado con las fechas
// Recorrer el array for of
// Por cada fecha agregar un <th>, agrgarle text = valor del array(posicion)


// En la primera celda se incluye el boton añadir riego, se deja vacia. 
const generarCabecera = (fechas, posHoy) => {

    // Generamos una celda vacia para incluir el boton: agregar riego. 
    let encabBtnRiego =  document.createElement('th'); 
    encabBtnRiego.innerHTML = ""
    encabFechas$$.appendChild(encabBtnRiego) 
    
    
    for (let [index, fecha] of fechas.entries()) {
        let encabFecha =  document.createElement('th');         
        
        let dia = fecha.substring(4, 6)        

        encabFecha.innerHTML = fecha.substring(0,3).toUpperCase() + "<br>" + dia
        
        if (index == posHoy-1) {
            encabFecha.classList.add('azul')
        }
        encabFechas$$.appendChild(encabFecha)  

    }
}

const generarHorasCeldas = () => {

    for (const hora of horasDia) {

    
    // Generamos una celda para la hora del dia: 01:00 - 23:00
        let row = document.createElement('tr')
        tbCalendar$$.appendChild(row)

        let cell = document.createElement('td')
        cell.innerHTML = hora
        row.appendChild(cell)

    // En cada fila, agregamos una celda para cada dia de la semana: L-V. 
        for (const fecha of fechas) {

            let cell = document.createElement('td')
            cell.id = fecha + '-' + hora.substring(0,2)
            cell.addEventListener('click', mostrarDatosRiegoInput)
            row.appendChild(cell)
        }   
    
    }
}

let fechaActual = obtenerFechaActual()
let year = fechaActual.getFullYear()
let posHoy = fechaActual.getDay()
 

// Obtiene un array con las fechs de la semana de lunes a domigo, en formato: "NNN 00". 
let fechas = obtenerSemana(fechaActual)
generarCabecera(fechas, posHoy)

// Obtenems las horas del dia de 01:00 a 23:00
 let horasDia = generarHorasDia()

 generarHorasCeldas()
 

// Rellenamos los campos SELECT horaInicio y horaFin con las horas desde 01:00 a 23:00h

const informarHorasSelect = () => {

    for (const hora of horasDia) {
    
        let HourOptIni = document.createElement("option")
        let HourOptFin = document.createElement("option")
        
        HourOptIni.value = hora
        HourOptIni.text = hora
        HourOptFin.value = hora
        HourOptFin.text = hora
        
        horaInicio$$.appendChild(HourOptIni)
        horaFin$$.appendChild(HourOptFin)
    }

}

// Informa las horas 01:00 -> 23:00 para los campos SELECT. 
informarHorasSelect()


formRiego$$.addEventListener('submit', grabarRiego)


informarEventos(calendario)


// celdaColor$$.style.backgroundColor = "red";

