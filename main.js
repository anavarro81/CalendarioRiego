import { obtenerFechaActual, obtenerSemana } from './modules/fechas.js';

const celdas$$ = document.querySelectorAll("td")
const modal$$ = document.querySelector("#infoRiego")
const mostrarInputRiego$$ = document.querySelector("#mostrarInputRiego")
const horaInicio$$ = document.querySelector("#horaInicio")
const fechaRiego$$ = document.querySelector("#fechaRiego")
const tbCalendar$$ = document.querySelector("#tb-calendar")
const encabFechas$$ = document.querySelector("#encab-fechas")


// Muestra | Oculta el modal para recoger el horario de riego.
const closeModal = () => {
    modal$$.style.display = 'none';
}

const mostrarDatosRiegoInput = (e) => {
    
    modal$$.style.display = 'flex';
    fechaRiego$$.innerHTML = e.target.id
    console.log(e.target.id)  

    


}

// Genera arraay con las horas desde 01:00 hasta 23:00
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
        
        let posComa = fecha.indexOf(',') + 1
        
        console.log('fecha: ', fecha)
        console.log('posComa: ', posComa)
        let dia = fecha.substring(posComa, 2)
        console.log('dia: ', dia)

        encabFecha.innerHTML = fecha.substring(0,3).toUpperCase()
        
        if (index == posHoy-1) {
            encabFecha.classList.add('azul')
        }
        encabFechas$$.appendChild(encabFecha)  

    }
}


let fechaActual = obtenerFechaActual()

let posHoy = fechaActual.getDay()
 

// Obtiene un array con las fechs de la semana de lunes a domigo, en formato: "NNN 00". 
let fechas = obtenerSemana(fechaActual)
generarCabecera(fechas, posHoy)

// Obtenems las horas del dia de 01:00 a 23:00
 let horasDia = generarHorasDia()


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
        cell.id = fecha + '-' + hora.substring(1,2)
        cell.addEventListener('click', mostrarDatosRiegoInput)
        row.appendChild(cell)
    }   
    
}



