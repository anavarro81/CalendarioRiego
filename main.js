import { obtenerFechaActual, obtenerSemana } from './modules/fechas.js';
import {informarEventos} from './modules/calendar.js'

const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "sabado", "domingo"];
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];


const modal$$ = document.querySelector("#nuevoRiego")
const modalActRiego$$ = document.querySelector('#actualizarRiegoModal')


const horaInicio$$ = document.querySelector("#horaInicio")
const horaFin$$ = document.querySelector("#horaFin")

const fechaRiego$$ = document.querySelector("#fechaRiego")
const fechaRiegoSelect$$ = document.querySelector("#fechaRiegoSelect")

const tbCalendar$$ = document.querySelector("#tb-calendar")
const encabFechas$$ = document.querySelector("#encab-fechas")

const formRiego$$ = document.querySelector("#formRiego")

const cerrarModalBtn = document.querySelector('#btn-close-modal')
const cerrarModalModifBtn = document.querySelector('#btn-close-modalModif')


// Modal Modif-Borrado. 
// Encabezado. Riego. 
const titModModif$$ = document.querySelector('#tit-mod-modif')

const borrarRiegoBtn$$ = document.querySelector('#borrarRiego')

const infoRiegoSelect$$ = document.querySelector('#info-riego-select')
const editarRiegoBtn$$ = document.querySelector('#editarRiego')

//



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

const closeModalModif = () => {
    modalActRiego$$.style.display = 'none'
}



//Borrar riego. 
// 1. Elimina el objeto Riego asociado en la arraya calendario por id
// 2. Elimina el color del fondo de las celdas correspondientes en el calendario

const borrarRiego = (e) => {

    console.log('Estoy en borrar riego...')
    
    // Obtengo el id del riego a borrar. 
    let dataId = e.currentTarget.getAttribute('data-id')

    // seleccionado las celdas a borrar. 
    let celdasRiego = document.querySelectorAll(`td[data-id="${dataId}"]`)

    for (const celdaRiego of celdasRiego) {
        celdaRiego.style.backgroundColor = "transparent";
    }

}

const editarRiego = (e) => {
    
    console.log('He pulsado editar riego... ')
    
    // Obtengo el id del riego a modificar.
    let dataId = e.currentTarget.getAttribute('data-id')
    console.log('Voy a editar el riego con id = ',  dataId)



}

// Ejemplo id: MAR-17-10-03  
const mostrarDatosRiegoInput = (e) => {

    if(e.currentTarget.hasAttribute('data-id')){
        // mostramos modal de editar y eliminar con los datos de esa tarea
        let dataId = e.currentTarget.getAttribute('data-id');
        
        // celdaColor.setAttribute('data-id', unicoId);
        
        console.log('esta celda pertenece a la tarea: ' + dataId);
        modalActRiego$$.style.display = 'flex';

        // Asigo el atributo data-id al boton del modal con el valor del id seleccinado para borrarlo si se hace click. 
        borrarRiegoBtn$$.setAttribute('data-id', dataId)
        editarRiegoBtn$$.setAttribute('data-id', dataId)


        titModModif$$.innerHTML = "Soy Juanito"
        
        // Seleccionamos todas las celdas de la tabla, que tengan el atributo data-id con el valor del id inicado. 
        // Cada objeto Riego tiene un id único. 
        

        console.log('Celdas Riego', celdasRiego)
        borrarRiegoBtn$$.id = dataId





    } else {
        // Modal: Nuevo Riego
        modal$$.style.display = 'flex';
        
        
        // Activa por defecto el dia de la celda seleccionada en el campo SELECT.   
        const [diaSemana, diaMes, mes, horaInicio] = e.target.id.split('-')

        let numOpciones = fechaRiegoSelect$$.options.length

        for (let ind=0; ind <numOpciones; ind++) {
            
            let fechaSelecionada = fechaRiegoSelect$$.options[ind].value

            if (fechaSelecionada.includes(diaSemana)) {

                let fechaDefecto = fechaRiegoSelect$$.querySelector(`option[value="${fechaSelecionada}"]`);
                fechaDefecto.selected = true;

            }
            

        }
        let horaFin = parseInt(horaInicio) + 1   
            horaFin = horaFin.toString().padStart(2, '0') + ":00"
        
        let hora = horaInicio.toString() + ":00"

        
        infoRiegoSelect$$.innerHTML = `${diaSemana}, ${diaMes} de  ${meses[mes-1]} | ${hora}  &#8212  ${horaFin}`

        fechaRiego$$.innerHTML = e.target.id
    }
    

     
    

}

const grabarRiego = (e) => {
    e.preventDefault();
 


    // lunes-23-10-01

    let [diaSemana, diaMes, mes, horaIni] = fechaRiego$$.innerHTML.split('-')
    
    let fechaRiego = diaMes + '-' + mes + '-' + year

    

    // console.log(fechaRiego$$.innerHTML)

    let id = generarIdUnico();
    let titulo = "" 

    // Si no se informa el cultivo a regar, se informa con un texto por defecto. 
    if (e.target.titulo.value == ""){
        titulo = '(Sin riego definido)'
    } else {
        titulo = e.target.titulo.value
    }

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
cerrarModalModifBtn.addEventListener('click', closeModalModif)   
borrarRiegoBtn$$.addEventListener('click', borrarRiego)
editarRiegoBtn$$.addEventListener('click', editarRiego)
informarEventos(calendario)




