const celdaColor$$ = document.querySelector("#LUN-09-09-01")
// Añadir riego

// Modificar Riego 


// Borrar Riego. 


// Marcar riego


// class Riego {
//     constructor(fecha, titulo, horaInicio, horaFinal) {
//       this.fecha = fecha;
//       this.titulo = titulo;
//       this.horaInicio = horaInicio;
//       this.horaFinal = horaFinal;
//     }
//   }
  
const calendario = [{
    fecha: '09-09-23', titulo: 'Riego Patatas', horaInicio: '01:00', horaFinal: '04:00'
}]



// ID = LUN-09-09-01 -> LUN-09-09-04



const informarEventos = (calendario) => {

    for (const event of calendario) {

        let horaInicio = parseInt(event.horaInicio.substring(0, 2))
        let horaFinal =  parseInt(event.horaFinal.substring(0, 2))

        for (let hora = horaInicio; hora <= horaFinal; hora++) {
            
            let id = "LUN-09-09-" + ('0' + hora).slice(-2)
            
            console.log(id)
            
        }
                
        
    }

}

informarEventos(calendario)
celdaColor$$.style.backgroundColor = "red";