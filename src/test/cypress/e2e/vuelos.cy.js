
describe('Búsqueda de vuelos', () => {
  it('al ingresar datos correctos, muestra los vuelos correspondientes', () => {

    // Given ...

    cy.visit('http://localhost:8080/inicio');
    cy.get('#username').type('rimtyouss@prueba3.com');
    cy.get('#password').type('prueba123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index');

    cy.visit('http://localhost:8080/vuelos');

    // When ...

    cy.get('#inputOrigen').type('Madrid');
    cy.get('#inputDestino').type('Barcelona');
    cy.get('#inputFechaIda').type('2023-04-01');
    cy.get('#inputFechaVuelta').type('2023-04-05');
    cy.get('button[type="submit"]').click();

    // Then ...

    // Verificar que los datos del vuelo coinciden
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



  });
});