
const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];



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

    console.log('fechaLunes > ', fechaLunes)
    console.log('fechaDomingo > ', fechaDomingo)
    

    let fecha_actual = new Date (fechaLunes)
    
    // Formatea la fecha y la guarda. 
    while (fecha_actual <= fechaDomingo) {        
        console.log('fecha_actual > ', fecha_actual)
        // let fechaCompleta = formatearFechaCompleta(fecha_actual)
        // semana.push(fechaCompleta) 
        // semana.push(fecha_actual)
        semana.push(new Date(fecha_actual)) 
        console.log('semana -->', semana)
        fecha_actual.setDate(fecha_actual.getDate() + 1);       
    }
    
    // console.log('Semana final:', semana)

    return semana

}    

//

const obtenerFechaActual = () => {
    

    return new Date();
}

const formatearFechaCompleta = (fecha) => {

    
    let dia_semana = fecha.getDay()
    let dia_mes = fecha.getDate()
    let mes = fecha.getMonth()    
    let fecha_formateada = diasSemana[dia_semana] + ',' + dia_mes + ' de ' + meses[mes]    
    return fecha_formateada;

}



// export { obtenerFechaActual, obtenerSemana, formatearFechaCompleta };


let fechaActual = new Date();

console.log(fechaActual)

obtenerSemana(fechaActual)


    



