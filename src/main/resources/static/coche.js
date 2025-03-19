function calcularPrecioTotal(fechaInicio, fechaFin, precioPorDia) {
    const date1 = new Date(fechaInicio);
    const date2 = new Date(fechaFin);
    const sub = Math.abs(date2.getTime() - date1.getTime());
    const difDias = Math.ceil(sub / (1000 * 3600 * 24));
    return difDias * precioPorDia;
}

function reservarCoche(event, button) {
    event.preventDefault();

    const precioCocheDia = parseFloat(button.dataset.price);
    const fechaInicioCoche = document.getElementById('fechaInicio').value;
    const fechaFinCoche = document.getElementById('fechaFin').value;
    const cocheId = button.dataset.id;
    const marca = button.dataset.name;
    const cocheImagen = button.dataset.image;


    if (fechaInicioCoche && fechaFinCoche) {
        const precioCocheTotal = calcularPrecioTotal(fechaInicioCoche, fechaFinCoche, precioCocheDia);
        const cocheReservado = {
                Id: cocheId,
                marca: marca,
                precioCocheDia: precioCocheDia,
                fechaInicioCoche: fechaInicioCoche,
                fechaFinCoche: fechaFinCoche,
                precioCocheTotal: precioCocheTotal,
                cocheImagen : cocheImagen

            };
        localStorage.setItem('cocheReservado', JSON.stringify(cocheReservado));
               localStorage.setItem('precioCocheTotal', precioCocheTotal);
               alert('Coche reservado con éxito! El precio total es: $' + precioCocheTotal);
               guardarReservaBD(cocheReservado);


    } else {
        alert('Por favor, seleccione las fechas de inicio y fin.');
    }
}

function guardarReservaBD(cocheReservado) {
    const url = '/coche/reservarCoche';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cocheReservado)
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => console.log('Reserva de coche guardada en la BD:', data))
        .catch(error => console.error('Error al guardar el coche:', error));
}

