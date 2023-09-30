

const celdas$$ = document.querySelectorAll("td")
const modal$$ = document.querySelector("#infoRiego")
const mostrarInputRiego$$ = document.querySelector("#mostrarInputRiego")
const horaInicio$$ = document.querySelector("#horaInicio")
const fechaRiego$$ = document.querySelector("#fechaRiego")

const closeModal = () => {
    modal$$.style.display = 'none';
}

const mostrarDatosRiegoInput = (e) => {
    modal$$.style.display = 'flex';
    fechaRiego$$.innerHTML = e.target.id
    console.log(e.target.id)  
    


}

mostrarInputRiego$$.addEventListener('click', mostrarDatosRiegoInput)

celdas$$.forEach((element) => {
    element.addEventListener('click', mostrarDatosRiegoInput)
});

// Genera los horarios de riego: desde 01:00 hasta 23:00
for (let hora = 1; hora <= 23; hora++) {

    horaInicio = hora.toString().padStart(2, '0') + ":00";

    const nuevaHora = document.createElement('option');
    nuevaHora.value = horaInicio;
    nuevaHora.text  = horaInicio;
    horaInicio$$.appendChild(nuevaHora)
    
    // console.log(horaString);
    


}
  