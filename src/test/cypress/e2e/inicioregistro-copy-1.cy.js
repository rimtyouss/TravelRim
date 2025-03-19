describe('Inicio de sesión y registro', () => {
  it('registra un nuevo usuario correctamente y luego inicia sesión', () => {

    // Registro
    cy.visit('http://localhost:8080/registro');
    cy.get('#firstName').type('Rim');
    cy.get('#lastName').type('Tyouss');
    cy.get('#inputEmail').type('rimtyouss@prueba3.com');
    cy.get('#password').type('prueba123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/registro?success');

    // Inicio de sesión
    cy.visit('http://localhost:8080/inicio');
    cy.get('#username').type('rimtyouss@prueba3.com');
    cy.get('#password').type('prueba123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index');
  });
});




