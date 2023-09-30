daysOfWeek = ["lunes", "martes", "miércoles","jueves", "viernes", "sábado", "domingo"]



const obtenerLunes = (fecha) => {    
    let diaSemana = fecha.getDay()    
    let fechaLunes = new Date(fecha)    

// Si es domingo, le resto 6 dias para obtener el lunes
    if (diaSemana == 0) {
        fechaLunes.setDate(fechaLunes.getDate() - 6); 
    } else {
        fechaLunes.setDate(fechaLunes.getDate() - (diaSemana - 1)); 
    }

    return fechaLunes;
}

const obtenerDomingo = (fecha) => {    
    
    let diaSemana = fecha.getDay()    
    let fechaDomingo = new Date(fecha)   

    
    // Ajustamos para que el primer dia sea el 0.
    var diaAjustado = (diaSemana - 1 + 7) % 7;
   
    // Calculamos la dierencia con el sexto dia (6), domingo.     
    diasSumar = 6 - diaAjustado    
    
    fechaDomingo.setDate(fechaDomingo.getDate() + diasSumar); 

    return (fechaDomingo)

}


let fechaActual = new Date("2023-09-28");


// console.log(obtenerLunes(fechaActual)) 
    fechaActual = new Date("2023-09-25");
    console.log(obtenerLunes(fechaActual))

    fechaActual = new Date("2023-09-26");
    console.log(obtenerLunes(fechaActual))

    fechaActual = new Date("2023-09-27");
    console.log(obtenerLunes(fechaActual))

    fechaActual = new Date("2023-09-28");
    console.log(obtenerLunes(fechaActual))

    fechaActual = new Date("2023-09-29");
    console.log(obtenerLunes(fechaActual))

    fechaActual = new Date("2023-09-30");
    console.log(obtenerLunes(fechaActual))

    fechaActual = new Date("2023-10-01");
    console.log(obtenerLunes(fechaActual))



