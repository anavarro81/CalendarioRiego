import { obtenerFechaActual, obtenerSemana } from './modules/fechas.js';
import {informarEventos} from './modules/calendar.js'

const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "sabado", "domingo"];

const celdas$$ = document.querySelectorAll("td")
const modal$$ = document.querySelector("#nuevoRiego")
const fechasRiego$$ = document.querySelector("#fechaRiego")

const modalActRiego$$ = document.querySelector('#actualizarRiegoModal')

const mostrarInputRiego$$ = document.querySelector("#mostrarInputRiego")

const horaInicio$$ = document.querySelector("#horaInicio")
const horaFin$$ = document.querySelector("#horaFin")



const fechaRiego$$ = document.querySelector("#fechaRiego")
const fechaRiegoSelect$$ = document.querySelector("#fechaRiegoSelect")


const tbCalendar$$ = document.querySelector("#tb-calendar")
const encabFechas$$ = document.querySelector("#encab-fechas")

const formRiego$$ = document.querySelector("#formRiego")

const cerrarModalBtn = document.querySelector('#btn-close-modal')

// let calendario = [
    
//     { fecha: '16-10-2023', titulo: 'Riego Patatas', horaInicio: '01:00', horaFinal: '04:00' }, 

//     { fecha: '18-10-2023', titulo: 'Riego Tomates', horaInicio: '08:00', horaFinal: '12:00' },

//     { fecha: '22-10-2023', titulo: 'Riego Tomates', horaInicio: '16:00', horaFinal: '21:00' },

// ]

let calendario = []

class Riego {
    constructor(id, fecha, titulo, horaInicio, horaFinal) {
      this.id = id;
      this.fecha = fecha;
      this.titulo = titulo;
      this.horaInicio = horaInicio;
      this.horaFinal = horaFinal;
    }
  }
  
  




const closeModal = () => {
    modal$$.style.display = 'none';
}

// Ejemplo id: MAR-17-10-03  
const mostrarDatosRiegoInput = (e) => {

    if(e.currentTarget.hasAttribute('data-id')){
        // mostramos modal de editar y eliminar con los datos de esa tarea
        let dataId = e.currentTarget.getAttribute('data-id');
        console.log('esta celda pertenece a la tarea: ' + dataId);
        modalActRiego$$.style.display = 'flex';
    } else {
        // Modal: Nuevo Riego
        modal$$.style.display = 'flex';
        
        
        fechaRiego$$.innerHTML = e.target.id
    }
    

     
    

}

const grabarRiego = (e) => {
    e.preventDefault();
 


    // LUN-09-09

    let diaMes = fechaRiego$$.innerHTML.substring(4,9)
    let fechaRiego = diaMes + '-' + year

    

    // console.log(fechaRiego$$.innerHTML)

    let id = generarIdUnico();
    let titulo = e.target.titulo.value
    let horaInicio = e.target.horaInicio.value
    let horaFin = e.target.horaFin.value
    
    let nuevoRiego = new Riego(id, fechaRiego, titulo, horaInicio, horaFin)      
    
    calendario = [...calendario,  nuevoRiego]   

    console.log(calendario)
    
    
    // Cierra el modal y vuelve al Calendario. 
    closeModal()

    informarEventos(calendario)

}

function generarIdUnico(){
    return 'id-'+Date.now()+'-'+Math.round(Math.random()*1000000);
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


        let [diaSemana, diaMes, nMes] = fecha.split('-')       
        

        encabFecha.innerHTML = diaSemana.substring(0,3).toUpperCase() + "<br>" + diaMes
         
        if (diaSemana == diasSemana[posHoy]) {
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
let fechas = obtenerSemana(fechaActual, 1)
let fechasLit = obtenerSemana(fechaActual, 2)

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

// Informa las fechas de riego para el formulario. 

const informarSelectFechas = () => {

    for (let fecha of fechasLit) {
        let fechaRiego = document.createElement("option")
        fechaRiego.value = fecha
        fechaRiego.text = fecha

        fechaRiegoSelect$$.appendChild(fechaRiego)
    }

    


}

informarSelectFechas()

formRiego$$.addEventListener('submit', grabarRiego)
cerrarModalBtn.addEventListener('click', closeModal)

informarEventos(calendario)


// celdaColor$$.style.backgroundColor = "red";

