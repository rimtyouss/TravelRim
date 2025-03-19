// Puedes usar esta función para llamar al API REST de tu aplicación
function peticionApi(ruta, metodo, cuerpo, usuario, clave) {
    return fetch(ruta, {
        headers: {
            'Authorization': 'Basic ' + btoa(usuario + ":" + clave),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: cuerpo && JSON.stringify(cuerpo) || null
    });
}


const origen = document.getElementById("inputOrigen");
const destino = document.getElementById("inputDestino");
const fechaIda = document.getElementById("inputFechaIda");
const fechaVuelta = document.getElementById("inputFechaVuelta");



function rutaBusqueda(origen, destino, fechaIda, fechaVuelta,precio) {
    if (origen && !destino && !fechaIda && !fechaVuelta && !precio) {
        return `vuelos/buscar_por_origen?origen=${encodeURIComponent(origen)}`;
    } else if (!origen && destino && !fechaIda && !fechaVuelta) {
        return `vuelos/buscar_por_destino?destino=${encodeURIComponent(destino)}`;
    } else if (!origen && !destino && fechaIda && !fechaVuelta) {
        return `vuelos/buscar_por_fecha_ida?fechaIda=${encodeURIComponent(fechaIda)}`;
    } else if (!origen && !destino && !fechaIda && fechaVuelta) {
        return `vuelos/buscar_por_fecha_vuelta?fechaVuelta=${encodeURIComponent(fechaVuelta)}`;
    } else {
        // por si se rellena todo
        return `vuelos/buscar_vuelos?origen=${origen}&destino=${destino}&fechaIda=${fechaIda}&fechaVuelta=${fechaVuelta}`;
    }
}

function buscarVuelos(event) {
  event.preventDefault();

  const rutaDeBusqueda = rutaBusqueda(origen.value, destino.value, fechaIda.value, fechaVuelta.value);

  fetch(rutaDeBusqueda)
      .then(respuesta => respuesta.json())
      .then(json => {
        console.log(json);

        const tablaVuelos = document.getElementById("tablaVuelos");
        tablaVuelos.innerHTML = "";

        json.forEach(vuelo => {
          const row = document.createElement("tr");

          const origenCell = document.createElement("td");
          origenCell.textContent = `${vuelo.origen}`;
          row.appendChild(origenCell);

          const destinoCell = document.createElement("td");
          destinoCell.textContent = `${vuelo.destino}`;
          row.appendChild(destinoCell);

          const fechaIdaCell = document.createElement("td");
          fechaIdaCell.textContent = `${vuelo.fechaIda}`;
          row.appendChild(fechaIdaCell);

          const fechaRegresoCell = document.createElement("td");
          fechaRegresoCell.textContent = `${vuelo.fechaVuelta}`;
          row.appendChild(fechaRegresoCell);

          const precioCell = document.createElement("td");
          precioCell.textContent = `${vuelo.precio}`;
          row.appendChild(precioCell);

          const botonReserva = document.createElement("button");
          botonReserva.classList.add("btn", "btn-primary");
          botonReserva.textContent = "Reservar vuelo";
          botonReserva.addEventListener('click', () => guardarVueloReservado(vuelo));

            row.appendChild(botonReserva);

          tablaVuelos.appendChild(row);
        });

      })
      .catch(error => {
        console.error('Error al buscar vuelos:', error);
      });
}
function guardarVueloReservado(vuelo) {
    localStorage.setItem('vueloReservado', JSON.stringify(vuelo));
    const precioVueloTotal = parseFloat(localStorage.getItem('precioVueloTotal')) || 0;
    localStorage.setItem('precioVueloTotal', parseFloat(vuelo.precio));
}

