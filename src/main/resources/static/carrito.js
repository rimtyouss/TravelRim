function mostrarPrecioTotal() {
    const precioCocheTotal = parseFloat(localStorage.getItem('precioCocheTotal')) || 0;
    const precioVueloTotal = parseFloat(localStorage.getItem('precioVueloTotal')) || 0;
    const precioTotal = precioCocheTotal + precioVueloTotal;

    const elementoPrecioTotal = document.getElementById('precioTotal');
    if (elementoPrecioTotal) {
        elementoPrecioTotal.textContent = '$' + precioTotal.toFixed(2);
    }
}


function agregarCocheReservadoATabla() {
    const cocheReservado = JSON.parse(localStorage.getItem('cocheReservado'));
    if (cocheReservado) {
        const tabla = document.querySelector('tbody');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${cocheReservado.marca}</td>
            <td>$${cocheReservado.precioCocheDia}</td>
            <td>${cocheReservado.fechaInicioCoche} - ${cocheReservado.fechaFinCoche}</td>
            <td>$${cocheReservado.precioCocheTotal}</td>
            <td><button class="btn btn-danger" onclick="eliminarCocheReservado()">Eliminar</button></td>
        `;

        tabla.appendChild(fila);
    }
}

function agregarVueloReservadoATabla() {
    const vueloReservado = JSON.parse(localStorage.getItem('vueloReservado'));
    if (vueloReservado) {
        const tabla = document.querySelector('tbody');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${vueloReservado.origen} - ${vueloReservado.destino}</td>
            <td>$${vueloReservado.precio}</td>
            <td>${vueloReservado.fechaIda} - ${vueloReservado.fechaVuelta}</td>
            <td>$${vueloReservado.precio}</td>
            <td><button class="btn btn-danger" onclick="eliminarVueloReservado()">Eliminar</button></td>
        `;

        tabla.appendChild(fila);
    }
}

function agregarHotelReservadoATabla() {
    const hotelReservado = JSON.parse(localStorage.getItem('hotelReservado'));
    if (hotelReservado) {
        const tabla = document.querySelector('tbody');
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${hotelReservado.hotelName}, ${hotelReservado.hotelCity}</td>
            <td> - </td>
            <td>${hotelReservado.hotelCheckin} - ${hotelReservado.hotelCheckout}</td>
            <td> - </td>
            <td><a href="${hotelReservado.url}" target="_blank" class="btn btn-primary">Reservar</a>
            <button class="btn btn-danger" onclick="eliminarHotelReservado()">Eliminar</button></td>

        `;

        tabla.appendChild(fila);
    }
}


function eliminarCocheReservado() {
    localStorage.removeItem('cocheReservado');
    localStorage.removeItem('precioCocheTotal');
        mostrarPrecioTotal();

    location.reload();
}

function eliminarVueloReservado() {
    localStorage.removeItem('vueloReservado');
    localStorage.removeItem('precioVueloTotal');
    mostrarPrecioTotal();
    location.reload();
}

function eliminarHotelReservado() {
    localStorage.removeItem('hotelReservado');
    location.reload();
}


mostrarPrecioTotal();
agregarCocheReservadoATabla();
agregarVueloReservadoATabla();
agregarHotelReservadoATabla();

let emailUsuario;

fetch('/usuario_actual')
    .then(response => response.text())
    .then(email => {
        console.log(email);
        emailUsuario = email;
    })
    .catch(error => {
        console.error('Error al obtener el email del usuario:', error);
    });

document.getElementById('guardar-carrito').addEventListener('click', function() {
    guardarCarritoEnTabla(emailUsuario);
});
function guardarCarritoEnTabla(emailUsuario) {
    const cocheReservado = JSON.parse(localStorage.getItem('cocheReservado'));
    const vueloReservado = JSON.parse(localStorage.getItem('vueloReservado'));
    const hotelReservado = JSON.parse(localStorage.getItem('hotelReservado'));

    const precioCocheTotal = parseFloat(localStorage.getItem('precioCocheTotal')) || 0;
    const precioVueloTotal = parseFloat(localStorage.getItem('precioVueloTotal')) || 0;
    const precioTotal = precioCocheTotal + precioVueloTotal;

    const carrito = {
        emailUsuario : emailUsuario,
        cocheReservado: JSON.stringify(cocheReservado),
        vueloReservado: JSON.stringify(vueloReservado),
        hotelReservado: JSON.stringify(hotelReservado),
        precioTotal
    };

    fetch('/guardar_carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrito)
    })
        .then(response => {
            if (response.ok) {
                console.log('Carrito guardado');
                borrarLocalStorage();
            } else {
                console.error('Error al guardar el carrito');
            }
        })
        .catch(error => {
            console.error('Error POST:', error);
        });
}


function borrarLocalStorage() {
    localStorage.removeItem('cocheReservado');
    localStorage.removeItem('precioCocheTotal');
    localStorage.removeItem('vueloReservado');
    localStorage.removeItem('precioVueloTotal');
    localStorage.removeItem('hotelReservado');
    location.reload();

}
