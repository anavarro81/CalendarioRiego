const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "sabado", "domingo"];




const informarEventos = (calendario) => {

    for (const event of calendario) {


        console.log('event = ', event)

        let unicoId = event.id;


        let horaInicio = parseInt(event.horaInicio.substring(0, 2))
        let horaFinal =  parseInt(event.horaFinal.substring(0, 2))

        let [dia, mes, anyo] = event.fecha.split('-')
        let fecha = new Date (anyo, mes-1, dia)
        let dayOfWeek = fecha.getDay()
        let dayofWeek_prefix = diasSemana[dayOfWeek]


        for (let hora = horaInicio; hora <= horaFinal; hora++) {
            

            let id = '#' + dayofWeek_prefix + '-' + dia + '-' + mes + '-' + ('0' + hora).slice(-2) 
            
            let celdaColor = document.querySelector(id)
            celdaColor.setAttribute('data-id', unicoId);
             
            celdaColor.style.backgroundColor = 'rgb(210,227,252)';

            if (hora == horaInicio) {
                celdaColor.innerHTML = event.titulo
            }


            
        }

       
                
        
    }

}

export { informarEventos };

// informarEventos(calendario)
// celdaColor$$.style.backgroundColor = "red";