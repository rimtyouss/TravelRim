const tabla = document.getElementById('reservas');
fetch('/reservas')
    .then(response => response.json())
    .then(json => {
        json.forEach(reserva => {
            const coche = JSON.parse(reserva.cocheReservado);
            const vuelo = JSON.parse(reserva.vueloReservado);
            const hotel = JSON.parse(reserva.hotelReservado);

            let row = document.createElement('tr');

            row.innerHTML += `<tr>
                        <td>${reserva.emailUsuario}</td>
                        <td>
                          Marca: ${coche?.marca}<br>
                          Precio por día: ${coche?.precioCocheDia}<br>
                          Fecha Inicio: ${coche?.fechaInicioCoche}<br>
                          Fecha Fin: ${coche?.fechaFinCoche}<br>
                          Precio Total: ${coche?.precioCocheTotal}
                        </td>
                        <td>
                          Origen: ${vuelo?.origen}<br>
                          Destino: ${vuelo?.destino}<br>
                          Fecha Ida: ${vuelo?.fechaIda}<br>
                          Fecha Vuelta: ${vuelo?.fechaVuelta}<br>
                          Precio: ${vuelo?.precio}
                        </td>
                        <td>
                          Nombre: ${hotel?.hotelName}<br>
                          Ciudad: ${hotel?.hotelCity}<br>
                          Check-in: ${hotel?.hotelCheckin}<br>
                          Check-out: ${hotel?.hotelCheckout}<br>
                          URL: <a href="${hotel?.url}" target="_blank">Ver hotel</a>
                        </td>
                        <td>${reserva.precioTotal}</td>
                    </tr>`

            const botonReserva = document.createElement("button");
            botonReserva.textContent = "Procesar reserva";
            botonReserva.addEventListener('click', () => generarPDF(reserva.emailUsuario, reserva.cocheReservado, reserva.vueloReservado, reserva.hotelReservado, reserva.precioTotal));
            row.append(botonReserva);
            tabla.appendChild(row);

        })
    });

function generarPDF(email, coche, vuelo, hotel, precio) {
    var doc = new jsPDF();
    doc.text(`Reserva para: ${email}`, 10, 10);
    doc.text(`Coche Reservado: ${coche}`, 10, 20);
    doc.text(`Vuelo Reservado: ${vuelo}`, 10, 30);
    doc.text(`Hotel Reservado: ${hotel}`, 10, 40);
    doc.text(`Precio Total: ${precio}`, 10, 50);
    doc.text(`Gracias por la reserva! Buen viajeee!!!!!!!`, 10, 60);
    doc.save('reserva.pdf');
}
