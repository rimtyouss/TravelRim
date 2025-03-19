const opcionesPaises = document.getElementById("inputGroupSelect01");
const opcionesCiudades = document.getElementById("inputGroupSelect02");
const hotelesLista = document.getElementById("hotelesLista");

const cargarPaises = () => {
    fetch("hotels.json", {method: "GET"})
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los hoteles');
            }
            return response.json();
        })
        .then(data => {
            const paisesUnicos = {};
            data.forEach(hotel => {
                const pais = hotel.country;
                // quitar duplicados!!
                if (!paisesUnicos[pais]) {
                    paisesUnicos[pais] = true;
                    const option = document.createElement("option");
                    option.value = pais;
                    option.text = pais;
                    opcionesPaises.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
};

const cargarHotel = (paisSeleccionado) => {
    fetch("hotels.json", {method: "GET"})
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los hoteles');
            }
            return response.json();
        })
        .then(data => {
            const hotelesFiltrados = data.filter(hotel => hotel.country === paisSeleccionado);

            const tabla = document.createElement("table");
            tabla.classList.add("table", "table-striped");

            const thead = document.createElement("thead");
            const trHead = document.createElement("tr");

            const thCiudad = document.createElement("th");
            thCiudad.textContent = "Ciudad";

            const thNombre = document.createElement("th");
            thNombre.textContent = "Nombre del Hotel";

            const thInfo = document.createElement("th");
            thInfo.textContent = "Información";

            const thRating = document.createElement("th");
            thRating.textContent = "Valoracion media";

            const thReserva = document.createElement("th");
            thReserva.textContent = "Reservar";
            trHead.append(thCiudad);
            trHead.appendChild(thNombre);
            trHead.appendChild(thInfo);
            trHead.appendChild(thRating);
            trHead.appendChild(thReserva);
            thead.appendChild(trHead);
            tabla.appendChild(thead);

            const tbody = document.createElement("tbody");

            hotelesFiltrados.forEach(hotel => {

                const tr = document.createElement("tr");
                const tdCiudad = document.createElement("td");
                tdCiudad.textContent = hotel.city;

                const tdNombre = document.createElement("td");
                tdNombre.textContent = hotel.hotel_name;

                const tdInfo = document.createElement("td");
                const checkin = hotel.checkin;
                const checkout = hotel.checkout;
                const latitude = hotel.latitude;
                const longitude = hotel.longitude;
                tdInfo.innerHTML = `Check-in: ${checkin}<br>Check-out: ${checkout}<br> <br> <iframe width="200" height="200" frameborder="0" style="border:0" src="//maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed"" allowfullscreen></iframe>`;

                const tdRating = document.createElement("td");
                tdRating.textContent = hotel.rating_average;

                const tdReserva = document.createElement("td");
                const enlace = document.createElement("a");
                enlace.href = hotel.url;
                enlace.target = "_blank";
                const botonReserva = document.createElement("button");
                botonReserva.classList.add("btn", "btn-primary");
                botonReserva.textContent = "Reservar";

                enlace.appendChild(botonReserva);
                tdReserva.appendChild(enlace);

                botonReserva.addEventListener("click", (event) => {
                    reservarHotel(hotel);
                });

                tr.appendChild(tdCiudad);
                tr.appendChild(tdNombre);
                tr.appendChild(tdInfo);
                tr.appendChild(tdRating);
                tr.appendChild(tdReserva);
                tbody.appendChild(tr);

                const foto1 = document.createElement("img");
                foto1.src = hotel.photo1;
                foto1.style.width = "200px";
                foto1.style.height = "200px";
                tr.appendChild(foto1);
                const foto2 = document.createElement("img");
                foto2.src = hotel.photo2;
                foto2.style.width = "200px";
                foto2.style.height = "200px";
                tr.appendChild(foto2);
                const foto3 = document.createElement("img");
                foto3.src = hotel.photo3;
                foto3.style.width = "200px";
                foto3.style.height = "200px";
                tr.appendChild(foto3);
                const foto4 = document.createElement("img");
                foto4.src = hotel.photo4;
                foto4.style.width = "200px";
                foto4.style.height = "200px";
                tr.appendChild(foto4);

            });

            tabla.appendChild(tbody);

            document.getElementById("hotelesLista").innerHTML = "";
            document.getElementById("hotelesLista").appendChild(tabla);
        })
        .catch(error => {
            console.error(error);
        });


};

opcionesPaises.addEventListener("change", (event) => {
    const paisSeleccionado = event.target.value;
    cargarHotel(paisSeleccionado);
});

cargarPaises();

function reservarHotel(hotelData) {

    const procesarInfo = {
        hotelName: hotelData.hotel_name,
        hotelCity: hotelData.city,
        hotelCheckin: hotelData.checkin,
        hotelCheckout: hotelData.checkout,
        url: hotelData.url,
    };

    console.log(procesarInfo);

    fetch("/hoteles/reservar", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(procesarInfo)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al reservar el hotel");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Hotel reservado con éxito:", data);
            alert('Hotel reservado con éxito!');

        })
        .catch((error) => {
            console.error("Error al reservar el hotel:", error);
        });
    localStorage.setItem("hotelReservado", JSON.stringify(procesarInfo));

}
