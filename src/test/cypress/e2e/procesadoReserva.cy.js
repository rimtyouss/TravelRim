describe('Reserva de hotel, búsqueda de vuelos, reserva de coche y procesamiento como administrador', () => {
  it('al reservar un hotel, se guarda en el carrito', () => {
    // Given ...

    cy.visit('http://localhost:8080/inicio');
    cy.get('#username').type('rimtyouss@prueba3.com');
    cy.get('#password').type('prueba123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index');

    cy.visit('http://localhost:8080/hoteles');

    // When ...
    cy.get('#inputGroupSelect01').select('Thailand');
    cy.get('tbody').find('tr').first().then(($row) => {
      cy.wrap($row).find('button').click();
    });

    // Then ...
    cy.visit('http://localhost:8080/carrito');
    cy.get('tbody').find('tr').first().then(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain', 'Sai Kaew Beach Resort'); // nombre del hotel
    });
  

  
    cy.visit('http://localhost:8080/vuelos');

    // When ...
    cy.get('#inputOrigen').type('Madrid');
    cy.get('#inputDestino').type('Barcelona');
    cy.get('#inputFechaIda').type('2023-04-01');
    cy.get('#inputFechaVuelta').type('2023-04-05');
    cy.get('button[type="submit"]').click();

    // Then ...

    // Verificar que el vuelo coincide
    cy.get('#tablaVuelos').find('tr').first().then(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain', 'Madrid'); // origen
      cy.wrap($row).find('td').eq(1).should('contain', 'Barcelona'); // destino
      cy.wrap($row).find('td').eq(2).should('contain', '2023-04-01'); // fecha de ida
      cy.wrap($row).find('td').eq(3).should('contain', '2023-04-05'); // fecha de vuelta

      //Reservar el vuelo
      cy.wrap($row).find('button').click();
    });

    cy.visit('http://localhost:8080/carrito');
    cy.get('tbody').find('tr').first().then(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain', 'Madrid - Barcelona');
      cy.wrap($row).find('td').eq(2).should('contain', '2023-04-01 - 2023-04-05');
    });


    cy.visit('http://localhost:8080/coche');

    cy.get('#fechaInicio').type('2023-05-20');
    cy.get('#fechaFin').type('2023-05-25');

    cy.get('#reservarCoche1').click();

    // Verificar carrito
    cy.visit('http://localhost:8080/carrito');
    cy.get('tbody').find('tr').first().then(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain', 'Audi A3'); // nombre del coche
    });
  

    // Iniciar sesión como administrador
    cy.visit('http://localhost:8080/inicio');
    cy.get('#username').type('admin@gmail.com');
    cy.get('#password').type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index');

    // Guardar la reserva
    cy.visit('http://localhost:8080/carrito');
    cy.get('#guardar-carrito').click();

    // Verificar  la reserva
    cy.visit('http://localhost:8080/users');
    cy.get('#reservas').should('contain', 'Sai Kaew Beach Resort'); // Nombre del hotel
    cy.get('#reservas').should('contain', 'Madrid'); // Vuelo
    cy.get('#reservas').should('contain', 'Audi A3'); // Coche
  });
});

