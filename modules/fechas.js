
const diasSemana = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SAB"];
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
        let fecha_formateada = formatearFechaCompleta(fecha_actual)
        semana.push(fecha_formateada)
        fecha_actual.setDate(fecha_actual.getDate() + 1);       
    }
    
    console.log('Semana final:', semana)

    return semana

}    

//

const obtenerFechaActual = () => {
    

    return new Date();
}


// Formatea una fecha a formato D-dd-mm
// D -> Dia de la semana, D = Domingo, L = Lunes, M = Martes. 
// dd -> día del mes
// mm -> numero de mes

const formatearFechaCompleta = (fecha) => {

    
    let dia_semana = fecha.getDay()
    
    // Si el dia del mes solo tiene un digito, se rellena con 0 por la izquieda. 
    // slice(-2) => coge los dos últimos caracteres. 
    let dia_mes = ('0' + fecha.getDate()).slice(-2)
    // Se suma 1 porque getMonth devuelve el numero del mes empezando en 0 para enero. 
    let mes = fecha.getMonth() + 1
    let mes_string = ('0' + mes).slice(-2)   

    
    
    let fecha_formateada = diasSemana[dia_semana] + '-' + dia_mes + "-" + mes_string
    
    return fecha_formateada;

}



export { obtenerFechaActual, obtenerSemana, formatearFechaCompleta };


let fechaActual = new Date();

console.log(fechaActual)

console.log('get date = ', fechaActual.getDate())
// let fecha = fechaActual.getDate().slice(-2)
// console.log('get date slice = ', ('0' + fechaActual.getDate()).slice(-2));
//  console.log('get date slice = ', fecha);

obtenerSemana(fechaActual)


    



