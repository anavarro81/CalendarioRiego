
const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];



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
// Puede devolver la semana en dos formatos:
   // 1.  semana => Lunes-16-10
   // 2.  semanaLiteral => Lunes 16 de octubre
  
const obtenerSemana= (fecha, formato) => {

    let fechaLunes = obtenerLunes(fecha)
    let fechaDomingo = obtenerDomingo(fecha)
    let semana = []   

    let fecha_actual = new Date (fechaLunes)

    // Formato = Lunes-16-10
    if (formato == 1) {
    
        // Formatea la fecha y la guarda. 
        while (fecha_actual <= fechaDomingo) {        
            let fecha_formateada = formatearFechaCompleta(fecha_actual)
            semana.push(fecha_formateada)
            fecha_actual.setDate(fecha_actual.getDate() + 1);       
        }
    return semana
    }
    // Lunes 16 de octubre
    if (formato == 2) {
    
        // Formatea la fecha y la guarda. 
        while (fecha_actual <= fechaDomingo) {                    
            let fechaLit = `${diasSemana[fecha_actual.getDay()]}, ${fecha_actual.getDate()} de ${meses[fecha_actual.getMonth()]}`
            semana.push(fechaLit)
            fecha_actual.setDate(fecha_actual.getDate() + 1);       
        }
        return semana
    }



    

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

const obtenerDiaSemana = () => {
    
}

// A partir de una fecha en formato DD-MM-AAAA, obtengo:
// 1.  El dia de la semana: Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo. 
// 2.  El mes del año: enero, febrero, marzo... 

const extraerDatosfecha = (fecha) => {
    let [dia, mes, anyo] = fecha.split('-')
    fecha = new Date (anyo, mes-1, dia)
    let dayOfWeek = fecha.getDay()
    
    // Devuelve el dia de la semana. 
    console.log(diasSemana[dayOfWeek])

    // Devuelve el dia dle mes
    let month = fecha.getMonth()
    console.log(meses[month])
}



// let fechaActual = new Date();
// obtenerSemana(fechaActual)

export { obtenerFechaActual, obtenerSemana, formatearFechaCompleta, extraerDatosfecha };
    

