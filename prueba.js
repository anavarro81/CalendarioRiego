const borrarRiego = (e) => {   
    
    
    

    // Obtengo el id del riego a borrar. 
    let dataId = e.currentTarget.getAttribute('data-id')

    // Borra del array de riegos el riego por id. Se usa el metodo filter para seleccionar los que no tengan ese id. 
    const calendarioFiltrado = calendario.filter(riego => riego.id !== dataId);
    calendario =  calendarioFiltrado
    

    // seleccionado las celdas a actualizar. 
    let celdasRiego = document.querySelectorAll(`td[data-id="${dataId}"]`)
    
    // Elimina los textos de las todas las celdas.       
    // Cambiar el color de fondo a trasparente de las celdas. 
    // Se elimina el atributo data-id de las celdas. 
    for (const celdaRiego of celdasRiego) {
        celdaRiego.innerHTML = ""
        celdaRiego.style.backgroundColor = "transparent";
        celdaRiego.removeAttribute('data-id')
    }

    closeInfoRiego()
