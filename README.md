# TravelRim


<img width="360" alt="image" src="https://github.com/user-attachments/assets/4a464d7e-2427-497d-8053-a7310c7d1b64" />


El proyecto consiste en la implementación de una página web de reserva de viajes,
“TravelRim”. Esta página web permite a los usuarios autentificados reservar
vuelos,hoteles y alquilar un coche, gestionando la reserva en el carrito de compras.
El administrador puede ver los usuarios registrados y procesar las reservas, crear,
borrar o editar vuelos.

El proyecto se ha desarrollado utilizando Spring Boot, con una arquitectura API
REST, permitiendo la interacción con el cliente y el servidor. Para la seguridad y
autentificación del usuario1, se ha hecho uso de la arquitectura SSR, asegurando que
solo los usuarios autenticados puedan realizar ciertas acciones, y por esta razón,
todos los ficheros html están situados en la carpeta “template”.
También se ha hecho uso de JPA (Java Persistence API) para la persistencia de datos
en la base de datos.

# Arquitectura de la Aplicación
La arquitectura de la aplicación se basa en el patron de diseño MVC (Modelo-Vista-
Controlador).
La aplicación está dividida en varios paquetes, y cada paquete contiene su entidad,
repositorios, servicios y controlador: usuarios,carritos,vuelos,hoteles y coches.

# Vistas
La aplicación web se compone de 9 vistas:
- Inicio.html : Inicio de sesión
- Registro.html: Registrarse
- Index.html
- Coche.html: Reservar un coche
- Hoteles.html : Reservar un hotel
- Vuelos.html : Reservar un vuelo
- Carrito.html
- Users.html : Admin - ver los usuarios registrados
- editarVuelos : Admin – crear, editar, borrar los vuelos

# Tablas
<img width="698" alt="image" src="https://github.com/user-attachments/assets/f1344d68-c319-4410-bb91-2fb0c60f72cf" />

# Endpoints

<img width="686" alt="image" src="https://github.com/user-attachments/assets/57a1599d-c31f-4480-894d-13aa1a885273" />


# Comportamiento

## 1. Se registra el usuario
   
El usuario se registra a través de un formulario HTML construida usando Thymeleaf, en “registro.html”. Cuando se envia el formulario, los datos se envían al servidor en una petición HTTP POST al endepoint “/registro/save”, guardando el usuario en la base de datos.

<img width="452" alt="image" src="https://github.com/user-attachments/assets/0bf0a9b7-f811-4089-90c5-8b5fb8c77f5e" />

Se crea su usuario en la tabla:

<img width="651" alt="image" src="https://github.com/user-attachments/assets/f5aa727e-3de0-4785-a02c-67e616366c16" />


## 2. Inicia sesión
   
El usuario inicia sesión a través de un formulario HTML en el archivo inicio.html. Cuando se envía el formulario, los datos se envían al servidor en una petición HTTP POST al endpoint “/inicio”. En el servidor, los datos se utilizan para buscar el usuario en la base de datos y verificar la contraseña. Si los datos son correctos, el servidor establece una sesión para el usuario. El código en “SpringSecurity.java” es el que configura la seguridad de la aplicación. Esto incluye la configuración de qué endpoints son accesibles a que usuarios y cuáles requieren autenticación. Además, se define cómo se manejan el inicio de sesión y el cierre de sesión.

  <img width="617" alt="image" src="https://github.com/user-attachments/assets/b3819c1a-3ab8-44e1-a7ec-d24c3f280f9a" />

## 3. Elige un vuelo, un hotel, un coche

-- Vuelos

El usuario puede buscar vuelos proporcionando diferentes criterios, como origen, destino, fecha de ida y fecha de vuelta. Cuando el usuario envía el formulario, se ejecuta la función buscarVuelos() en JavaScript. La función buscarVuelos() realiza una petición HTTP GET con los parámetros de búsqueda y obtiene los vuelos disponibles. Luego, los vuelos se muestran en una tabla en la página. Cuando el usuario hace clic en el botón "Reservar vuelo" en la tabla, se ejecuta la función guardarVueloReservado(). Esta función guarda los detalles del vuelo seleccionado en el almacenamiento local (localStorage) para su uso posterior en el carrito.

  <img width="700" alt="image" src="https://github.com/user-attachments/assets/4a7946c2-6a49-4d17-84b0-101add43199b" />

Elegimos el primer vuelo de Madrid a Barcelona.

  <img width="631" alt="image" src="https://github.com/user-attachments/assets/efb18543-f898-4d92-955c-cdf4c3fafebb" />


-- Hoteles

Elegimos el primer hotel: 
Para obtener los diferentes hoteles, se hace un fetch para obtener al archivo JSON “hotels.json” que contiene la información de los hoteles. 
El usuario puede elegir un hotel filtrando por país y cuando se selecciona un país, se ejecuta la función cargarHotel() en JavaScript. 
La función cargarHotel() realiza una petición HTTP GET con el país seleccionado como parámetro. La respuesta a la petición contiene los hoteles disponibles en el país seleccionado. 
Luego, los hoteles se muestran en una tabla en la página web. Cuando el usuario pulsa en el botón "Reservar" en la tabla, se ejecuta la función reservarHotel(). Esta función crea un objeto “procesarInfo” con los detalles del hotel seleccionado y realiza una petición HTTP POST al endpoint

  <img width="696" alt="image" src="https://github.com/user-attachments/assets/c2448543-5b5d-444d-8087-4ce3dadce5e8" />

“/hoteles/reservar” en el servidor para guardar la reserva en la base de datos.

-- Coches

Cuando se pulsa en el botón de reservar, se envía una petición HTTP POST al endpoint “/coche/reservarCoche” con los datos de la reserva. Estos datos se utilizan para crear un nuevo registro de reserva en la base de datos.
  <img width="557" alt="image" src="https://github.com/user-attachments/assets/35c3f7b9-3d91-4d72-be34-6f2f6f021097" />

También se guarda en el “local storage” la reserva del coche, para luego poder mandarla al carrito.

  <img width="677" alt="image" src="https://github.com/user-attachments/assets/764d5106-d482-478b-9808-3df1f8df73e8" />

  <img width="627" alt="image" src="https://github.com/user-attachments/assets/d3537fb7-25f8-4074-b94b-bfc4b9eada62" />

## 4. Carrito de compras

En el carrito de compras, podemos ver todas las reservas que ha hecho el usuario y el precio total:

Las funciones agregarCocheReservadoATabla(), agregarVueloReservadoATabla() y agregarHotelReservadoATabla() se utilizan para añadir los elementos reservados previamente al carrito, recuperando la información desde el almacenamiento local (localStorage).

<img width="659" alt="image" src="https://github.com/user-attachments/assets/5d097e42-6837-4024-9696-72d2ae939792" />

Al guardar carrito, se añade la reserva a la base de datos, con el email del usuario de la sesión.

  <img width="695" alt="image" src="https://github.com/user-attachments/assets/b308ddbb-9837-405d-9473-1dfb600091ce" />

## 5. Se desconecta el usuario y se conecta el administrador

Al administrador, le aparece una página que no les aparecen a los demás usuarios, “Usuarios”, donde puede ver los usuarios registrados y procesar las reservas que han sido guardadas. Esto se hace realizando una petición GET a través del endpoint “/usuario_actual“para obtener el email del usuario actual. Si el email es igual a "admin@gmail.com", se muestra la página de Usuarios. Esto permite que solo el usuario administrador tenga acceso a la página de procesamiento de reservas.

  <img width="615" alt="image" src="https://github.com/user-attachments/assets/20111deb-b42f-4757-b495-032423030d8d" />

Luego, se realiza una solicitud GET “/reservas” para obtener la lista de reservas guardadas en la base de datos en formato JSON. Al pulsar el botón “Procesar reserva”, se llama a la función generarPDF() y se le pasan como argumentos el email del usuario, los datos del coche, vuelo y hotel reservados, así como el precio total de la reserva. Esta función utiliza la biblioteca jsPDF para generar un archivo PDF con la información de la reserva.

  <img width="690" alt="image" src="https://github.com/user-attachments/assets/361c5a19-e090-45b8-8354-721f51d555f5" />

El administrador puede:
- Borrar un vuelo.
- Editar un vuelo.
- Crear un vuelo.

  <img width="687" alt="image" src="https://github.com/user-attachments/assets/68205455-292f-4c0c-ae0f-b4a98c7327da" />

