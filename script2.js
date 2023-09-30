const { eachDayOfInterval, startOfWeek, endOfWeek, format } = require('date-fns');

function obtenerSemanaCompleta(fecha) {
    // Obtener el inicio y el final de la semana que contiene la fecha
    const inicioSemana = startOfWeek(fecha, { weekStartsOn: 1 }); // El 1 indica que la semana comienza el lunes
    const finSemana = endOfWeek(fecha, { weekStartsOn: 1 });

// Devuelve los dias entre el periodo indicado (start-end)
    const fechasSemana = eachDayOfInterval({
        start: inicioSemana,
        end: finSemana
      })

    console.log('fechasSemana > ', fechasSemana);

    // Formatear las fechas para mostrarlas
    const fechasFormateadas = fechasSemana.map(fecha => format(fecha, 'yyyy-MM-dd'));    

    return fechasFormateadas;
}

// Uso de la función
const fechaEjemplo = new Date(); // Puedes usar cualquier fecha aquí
console.log("fechaEjemplo: ", fechaEjemplo)
const semanaCompleta = obtenerSemanaCompleta(fechaEjemplo);
console.log('Semana completa:', semanaCompleta);
