



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
    let diasSumar = 6 - diaAjustado    
    
    fechaDomingo.setDate(fechaDomingo.getDate() + diasSumar); 

    return (fechaDomingo)

}



// Obtiene la semana en formato:
// dia de la semana x(3) + dia. Ejemplo: "LUN 25", "MAR 26", "MIÉ 27"...
const obtenerSemana= (fecha) => {

    let fechaLunes = obtenerLunes(fecha)
    let fechaDomingo = obtenerDomingo(fecha)
    let semana = []
    let diasSemana = ["lunes", "martes", "miércoles","jueves", "viernes", "sábado", "domingo"]    

    let fecha_actual = new Date (fechaLunes)
    
    // Formatea la fecha y la guarda. 
    while (fecha_actual <= fechaDomingo) {        

        // Obtiene el dia del mes 1-31
        let dia = fecha_actual.getDate();
        let diaSemana = ""
        
        // Obtener el dia de la semana ('lunes', 'martes', 'miércoles'...)
        // A partir de la posicion getDay (0 = Domingo, 1 = Lunes, 2 = Martes... ), obtenemos
        // el dia que corresponda. 
        if (fecha_actual.getDay() == 0) {
            diaSemana = diasSemana[6]
        } else {
            diaSemana = diasSemana[fecha_actual.getDay()-1]
        }

        fecha = diaSemana.substring(0,3).toUpperCase() +  "-" +  dia                
        
        semana.push(fecha)
        fecha_actual.setDate(fecha_actual.getDate() + 1); 
    }
    console.log(semana)
    return semana

}    

//

const obtenerFechaActual = () => {
    return new Date();
}


export { obtenerFechaActual, obtenerSemana  };


// let fechaActual = new Date();
// obtenerSemana(fechaActual)


    



