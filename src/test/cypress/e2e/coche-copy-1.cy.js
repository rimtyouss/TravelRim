describe('Reserva de Coche', () => {
  it('Reserva un coche y lo guarda en el carrito', () => {

    cy.visit('http://localhost:8080/inicio');
    cy.get('#username').type('rimtyouss@prueba3.com');
    cy.get('#password').type('prueba123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index');

    cy.visit('http://localhost:8080/coche');

    cy.get('#fechaInicio').type('2023-05-20');
    cy.get('#fechaFin').type('2023-05-25');

    cy.get('#reservarCoche1').click();

    // Verificar carrito
    cy.visit('http://localhost:8080/carrito');
    cy.get('tbody').find('tr').first().then(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain', 'Audi A3'); // nombre del coche




    });
  });
});