const tablaVuelos = document.getElementById('tablaVuelos');
tablaVuelos.innerHTML = '';

function cargarVuelos() {
    fetch('/listaVuelos')
        .then(response => response.json())
        .then(json => {
            json.forEach(vuelo => {
                tablaVuelos.innerHTML += `
                <tr>
                    <td>${vuelo.ID}</td>
                    <td><input type="text" class="input-origen" id="input-origen-${vuelo.ID}" value="${vuelo.origen}" readonly></td>
                    <td><input type="text" class="input-destino" id="input-destino-${vuelo.ID}" value="${vuelo.destino}" readonly></td>
                    <td><input type="date" class="input-fecha-ida" id="input-fecha-ida-${vuelo.ID}" value="${vuelo.fechaIda}" readonly></td>
                    <td><input type="date" class="input-fecha-vuelta" id="input-fecha-vuelta-${vuelo.ID}" value="${vuelo.fechaVuelta}" readonly></td>
                    <td><input type="number" class="input-precio" id="input-precio-${vuelo.ID}" value="${vuelo.precio}" readonly></td>
                    <td>
                        <button class="btn btn-sm btn-danger btn-borrar" value="${vuelo.ID}">Borrar</button>
                        <button id="btn-editar-${vuelo.ID}" class="btn btn-sm btn-primary btn-editar" value="${vuelo.ID}">Editar</button>
                        <button id="btn-guardar-${vuelo.ID}" class="btn btn-sm btn-success btn-guardar" value="${vuelo.ID}" style="display: none;">Guardar</button>
                    </td>
                </tr>
            `;
            });
        });
}
cargarVuelos();
tablaVuelos.addEventListener('click', (event) => {
    const vueloAModificar = event.target;

    if (vueloAModificar.classList.contains('btn-borrar')) {
        const vueloId = vueloAModificar.value;

        fetch(`/borrarvuelo/${vueloId}`, {
            method: 'DELETE',
        })
            .then(response => {
                tablaVuelos.innerHTML = '';
                cargarVuelos();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else if (vueloAModificar.classList.contains('btn-editar')) {
        const vueloId = vueloAModificar.value;

        const inputOrigen = document.getElementById(`input-origen-${vueloId}`);
        const inputDestino = document.getElementById(`input-destino-${vueloId}`);
        const inputFechaIda = document.getElementById(`input-fecha-ida-${vueloId}`);
        const inputFechaVuelta = document.getElementById(`input-fecha-vuelta-${vueloId}`);
        const inputPrecio = document.getElementById(`input-precio-${vueloId}`);


        //poder modificar el vuelo
        inputOrigen.removeAttribute('readonly');
        inputDestino.removeAttribute('readonly');
        inputFechaIda.removeAttribute('readonly');
        inputFechaVuelta.removeAttribute('readonly');
        inputPrecio.removeAttribute('readonly');

        // y guardarlo
        const btnGuardar = document.getElementById(`btn-guardar-${vueloId}`);
        btnGuardar.style.display = 'inline-block';

        // Ocultar el botón de editar
        vueloAModificar.style.display = 'none';
    }


    else if (vueloAModificar.classList.contains('btn-guardar')) {
        const vueloId = vueloAModificar.value;

        const inputOrigen = document.getElementById(`input-origen-${vueloId}`);
        const inputDestino = document.getElementById(`input-destino-${vueloId}`);
        const inputFechaIda = document.getElementById(`input-fecha-ida-${vueloId}`);
        const inputFechaVuelta = document.getElementById(`input-fecha-vuelta-${vueloId}`);
        const inputPrecio = document.getElementById(`input-precio-${vueloId}`);

        const vueloActualizado = {
            origen: inputOrigen.value,
            destino: inputDestino.value,
            fechaIda: inputFechaIda.value,
            fechaVuelta: inputFechaVuelta.value,
            precio: parseFloat(inputPrecio.value),
        };

        fetch(`/editarvuelos/${vueloId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vueloActualizado),
        })
            .then(response => response.json())
            .then(vuelo => {

                //actualizar la tabla
                inputOrigen.value = vuelo.origen;
                inputDestino.value = vuelo.destino;
                inputFechaIda.value = vuelo.fechaIda;
                inputFechaVuelta.value = vuelo.fechaVuelta;
                inputPrecio.value = vuelo.precio;

                // y no poder editar mas
                inputOrigen.setAttribute('readonly', true);
                inputDestino.setAttribute('readonly', true);
                inputFechaIda.setAttribute('readonly', true);
                inputFechaVuelta.setAttribute('readonly', true);
                inputPrecio.setAttribute('readonly', true);

                // ocultar guardar
                vueloAModificar.style.display = 'none';

                // volver a monstrar editar
                const btnEditar= document.getElementById(`btn-editar-${vueloId}`);
                btnEditar.style.display = 'inline-block';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// PARA CREAR UN VUELO

const crearVueloForm = document.getElementById('formularioNuevoVuelo');

crearVueloForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const fechaIda = document.getElementById('fechaIda').value;
    const fechaVuelta = document.getElementById('fechaVuelta').value;
    const precio = parseFloat(document.getElementById('precio').value);

    const nuevoVuelo = {
        origen,
        destino,
        fechaIda,
        fechaVuelta,
        precio
    };

    fetch('/vuelos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoVuelo)
    })
        .then(response => response.json())
        .then(vuelo => {
            tablaVuelos.innerHTML = '';
            cargarVuelos();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
