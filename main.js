import { obtenerFechaActual, obtenerSemana, convertirFechaDDMMAAAA } from './modules/fechas.js';
import {informarEventos} from './modules/calendar.js'

const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "sabado", "domingo"];
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];


const modal$$ = document.querySelector("#nuevoRiego")
const modalinfoRiego$$ = document.querySelector('#Mostrar-Info-Riego')


const horaInicio$$ = document.querySelector("#horaInicio")
const horaFin$$ = document.querySelector("#horaFin")

const fechaRiego$$ = document.querySelector("#fechaRiego")
const fechaRiegoSelect$$ = document.querySelector("#fechaRiegoSelect")

const tbCalendar$$ = document.querySelector("#tb-calendar")
const encabFechas$$ = document.querySelector("#encab-fechas")

const formRiego$$ = document.querySelector("#formRiego")

const cerrarModalBtn = document.querySelector('#btn-close-modal')

// Nuevo Riego
const NuevoRiegoTit$$ = document.querySelector('#NuevoRiegoTit')


// Modal Modif-Borrado. 
// Encabezado. Riego. 

const infoRiegoModif = document.querySelector('#info-riego-no-modif')
const titModModif$$ = document.querySelector('#tit-mod-modif')
const closeModalModif$$ = document.querySelector('#btn-close-modalModif')


const borrarRiegoBtn$$ = document.querySelector('#borrarRiego')

const infoRiegoSelect$$ = document.querySelector('#info-riego-select')
const editarRiegoBtn$$ = document.querySelector('#editarRiego')
const fechaRiegoModif$$ = document.querySelector("#fechaRiegoModif")







//

// ------------------------------------------------------------------------- //
// Actualizar-Riego (Modal)
// ----------------

// Muestra los datos a editar del riego. 
const actRiegoModal$$ = document.querySelector('#Actualizar-Riego') 

// Act-Riego-Content 
const actRiegoBtn$$ = document.querySelector('#actRiego')   

// close-modal-modif
// Boton cerra modal 
const closeModalModifBtn$$ = document.querySelector('#close-modal-modif')

const tituloRiegoModif$$ = document.querySelector('#tituloRiegoModif')


// Hora de inicio de riego
const horaInicioModif$$ = document.querySelector('#horaInicioModif')

// Hora de fin de riego. 
const horaFinModif$$ = document.querySelector('#horaFinModif')


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
  
  const editarRiego = (e) => {   
    
    
    // Obtengo el id del riego a modificar.
    let dataId = e.currentTarget.getAttribute('data-id')
    
    // Oculto el modal actual 
    modalinfoRiego$$.style.display = 'none';
    
    // Muestro nuevo modal para editar el riego. 
    actRiegoModal$$.style.display = 'flex';   

    // Cargamos las fechas en el campo SELECT. 
    informarFechasModif()

    // Cargamos las horas INICIO en el campo SELECT
    informarHorasSelect(horaInicioModif$$, horaFinModif$$)




    // Buscamos en el array el indice recuperado. 
    const indexRiego = calendario.findIndex(riego => riego.id === dataId);

    if (indexRiego !== -1) {
        console.log('He encontrado el id de Riego = ', dataId)
        console.log(calendario[indexRiego].titulo)
        tituloRiegoModif$$.placeholder = calendario[indexRiego].titulo

        // Obtenemos la fecha actual. 
        const [dia, mes, anyo] = calendario[indexRiego].fecha.split('-')

        let fechaRiego = new Date (anyo, mes-1, dia)

        // Obtenemos el dia actual de la semana. Domingo = 0, Lunes = 1...
        let diaSemana = fechaRiego.getDay()

        
        // Activamos en el SELECT de fechas, el valor de la fecha actual
        if (diaSemana > 0) {
            fechaRiegoModif$$[diaSemana-1].selected = true
        } else {
            fechaRiegoModif$$[0].selected = true
        }

        // Seleccionamos por defecto la hora de inicio previamente indicada. 
        let horaInicio = calendario[indexRiego].horaInicio
        let horaInicioSelect = horaInicioModif$$.querySelector(`option[value="${horaInicio}"]`);
        horaInicioSelect.selected = true;

        // Selecionamos por defecto la hora de fin previamente indicada. 
        let horaFin = calendario[indexRiego].horaFinal
        let horaFinal = horaFinModif$$.querySelector(`option[value="${horaFin}"]`);
        horaFinal.selected= true;

        
    } else {
        console.log('No he encontrado el id de Riego = ', dataId)
    }
    
    

    
    actualizarRiego(dataId)
    
    



}

const actualizarRiego = (idRiego) => {
    
    // Busca por id el riego a actualizar. 
    const indexRiego = calendario.findIndex(riego => riego.id === idRiego);


    

    if (indexRiego !== -1) {
        console.log('He encontrado el id de Riego = ', idRiego)
        console.log(calendario[indexRiego].titulo)
        
    } else {
        console.log('No he encontrado el id de Riego = ', idRiego)
    }
}  


const actRiego = (e) => {

    console.log('Estoy en actalizar riego');    
    // Obtengo el id del riego a actualizar 
    
    let idRiego = editarRiegoBtn$$.getAttribute('data-id')

    console.log('id riego = ', idRiego)
    
    let titulo = tituloRiegoModif$$.value

    if (titulo == "") {
        titulo = tituloRiegoModif$$.placeholder
    }

    // Obtener en que posicion (indice) está el elemento seleccionado, dentro del SELECT. 
    let indice  = fechaRiegoModif$$.selectedIndex

    let fechaConvertida  = convertirFechaDDMMAAAA (fechaRiegoModif$$.value)

    let horaInicio = horaInicioModif$$.value
    let horaFin = horaFinModif$$.value

    // Buscar el indice
    const indexRiego = calendario.findIndex(riego => riego.id === idRiego);

    if (indexRiego !== -1) {

        calendario[indexRiego].titulo = titulo
        calendario[indexRiego].fecha = fechaConvertida
        calendario[indexRiego].horaInicio = horaInicio
        calendario[indexRiego].horaFinal = horaFin
    }

    console.log(calendario)



}




const closeModal = () => {
    modal$$.style.display = 'none';
}

const closeModalModif = () => {
    actRiegoModal$$.style.display = 'none'
}

const closeInfoRiego = () => {
    modalinfoRiego$$.style.display = 'none';
}



//Borrar riego. 
// 1. Elimina el objeto Riego asociado en la array calendario por id
// 2. Elimina el color del fondo de las celdas correspondientes en el calendario

const borrarRiego = (e) => {   
    
    
    

    // Obtengo el id del riego a borrar. 
    let dataId = e.currentTarget.getAttribute('data-id')

    // Borra del array de riegos el riego por id. Se usa el metodo filter para seleccionar los que no tengan ese id. 
    const calendarioFiltrado = calendario.filter(riego => riego.id !== dataId);
    calendario =  calendarioFiltrado
    

    // seleccionado las celdas a borrar con el data-id = id a borrar. 
    let celdasRiego = document.querySelectorAll(`td[data-id="${dataId}"]`)
    
    // Elimina los textos de las todas las celdas.       
    // Cambiar el color de fondo a trasparente de las celdas. 
    // Se elimina el atributo data-id de las celdas. 
    for (const celdaRiego of celdasRiego) {
        celdaRiego.innerHTML = ""
        celdaRiego.style.backgroundColor = "transparent";
        celdaRiego.removeAttribute('data-id')
    }

    closeModalModif()

}


// Ejemplo id: MAR-17-10-03  
const mostrarDatosRiegoInput = (e) => {

    if(e.currentTarget.hasAttribute('data-id')){
        // mostramos modal de editar y eliminar con los datos de esa tarea
        let dataId = e.currentTarget.getAttribute('data-id');
        
        // celdaColor.setAttribute('data-id', unicoId);
        
        console.log('esta celda pertenece a la tarea: ' + dataId);
        modalinfoRiego$$.style.display = 'flex';
        infoRiegoModif.style.display = 'flex';
        

        // Asigo el atributo data-id al boton del modal con el valor del id seleccinado para borrarlo si se hace click. 
        borrarRiegoBtn$$.setAttribute('data-id', dataId)
        editarRiegoBtn$$.setAttribute('data-id', dataId)

        // Seleccionamos todas las celdas de la tabla, que tengan el atributo data-id con el valor del id inicado. 
        // Cada objeto Riego tiene un id único. 
        
        // Buscamos por id en el Array la informacion del riego. 
        const indexRiego = calendario.findIndex(riego => riego.id === dataId);

        if (indexRiego !== -1) {   
            // Informamos el titulo del riego en el modal.          
            titModModif$$.innerHTML = calendario[indexRiego].titulo            
            
            const [diasSemana, mes, anyo]  = calendario[indexRiego].fecha.split('-')
            console.log(calendario[indexRiego].fecha)

            let numOpciones = fechaRiegoModif$$.options.length

            for (let ind=0; ind <numOpciones; ind++) {
            
                let fechaSelecionada = fechaRiegoModif$$.options[ind].value

                if (fechaSelecionada.includes(diasSemana)) {

                    let fechaDefecto = fechaRiegoModif$$.querySelector(`option[value="${fechaSelecionada}"]`);
                    fechaDefecto.selected = true;

                }
            

            }
            
        
        } else {
            console.log('No he encontrado el id de Riego = ', dataId)
        }


        titModModif$$.innerHTML = calendario[dataId].titulo
        
        borrarRiegoBtn$$.id = dataId





    } else {
        // Modal: Nuevo Riego
        modal$$.style.display = 'flex';

        // Limpia el campo input para no manter el último valor introducido
        NuevoRiegoTit$$.value = ""
        
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
    if (e.target.NuevoRiegoTit.value == ""){
        titulo = '(Sin riego definido)'
    } else {
        titulo = e.target.NuevoRiegoTit.value
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

const informarHorasSelect = (hInicio, hFin) => {

    for (const hora of horasDia) {
    
        let HourOptIni = document.createElement("option")
        let HourOptFin = document.createElement("option")
        
        HourOptIni.value = hora
        HourOptIni.text = hora
        HourOptFin.value = hora
        HourOptFin.text = hora
        
        hInicio.appendChild(HourOptIni)
        hFin.appendChild(HourOptFin)
    }

}

// Informa las horas 01:00 -> 23:00 para los campos SELECT. 
informarHorasSelect(horaInicio$$, horaFin$$)

// Informa las fechas de riego para el formulario. 

const informarSelectFechas = () => {

    for (let fecha of fechasLit) {
        let fechaRiego = document.createElement("option")
        fechaRiego.value = fecha
        fechaRiego.text = fecha

        fechaRiegoSelect$$.appendChild(fechaRiego)
        
    }   

}

const informarFechasModif = () => {

    
    // Elimina todos los elementos hijo de fechas antes de insertarlos. 
    while (fechaRiegoModif$$.firstChild) {
        fechaRiegoModif$$.removeChild(fechaRiegoModif$$.firstChild);
    }

    for (let fecha of fechasLit) {
        let fechaRiego = document.createElement("option")
        fechaRiego.value = fecha
        fechaRiego.text = fecha

        fechaRiegoModif$$.appendChild(fechaRiego)
        
    }   


}

informarSelectFechas()

formRiego$$.addEventListener('submit', grabarRiego)
cerrarModalBtn.addEventListener('click', closeModal)
   
borrarRiegoBtn$$.addEventListener('click', borrarRiego)
editarRiegoBtn$$.addEventListener('click', editarRiego)
actRiegoBtn$$.addEventListener('click', actRiego)
closeModalModif$$.addEventListener('click', closeInfoRiego)

closeModalModifBtn$$.addEventListener('click', closeModalModif) 





