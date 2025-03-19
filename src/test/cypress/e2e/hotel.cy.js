

describe('Reserva de hotel', () => {
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
  });
});

