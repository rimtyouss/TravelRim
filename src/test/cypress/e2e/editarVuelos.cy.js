describe('Operaciones de vuelos', () => {
  before(() => {

    // Iniciar sesión como administrador
    cy.visit('http://localhost:8080/inicio');
    cy.get('#username').type('admin@gmail.com');
    cy.get('#password').type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/index');
  });

  it('obtiene la lista de vuelos', () => {
    cy.request('GET', 'http://localhost:8080/listaVuelos')
      .its('body')
      .should('have.length.gt', 0);
  });

  it('borra un vuelo existente', () => {
    cy.request('GET', 'http://localhost:8080/listaVuelos')
      .its('body')
      .then((vuelos) => {
        if (vuelos.length > 0) {
          const vueloId = 4;

          cy.request('DELETE', `http://localhost:8080/borrarvuelo/${vueloId}`)
            .its('status')
            .should('eq', 200);
        }
      });
  });

  it('actualiza un vuelo existente', () => {
    cy.request('GET', 'http://localhost:8080/listaVuelos')
      .its('body')
      .then((vuelos) => {
        if (vuelos.length > 0) {
          const vueloId = 1;
          const vueloActualizado = {
            origen: 'Paris',
            destino: 'Rabat',
            fechaIda: '2023-06-10',
            fechaVuelta: '2023-06-15',
            precio: 500.0,
          };

          cy.request('PUT', `http://localhost:8080/editarvuelos/${vueloId}`, vueloActualizado)
            .its('status')
            .should('eq', 200);
        }
      });
  });
  it('crear un nuevo vuelo', () => {
    const nuevoVuelo = {
      origen: 'Dubai',
      destino: 'Alicante',
      fechaIda: '2023-07-01',
      fechaVuelta: '2023-07-05',
      precio: 1000.0,
    };

    cy.request('POST', 'http://localhost:8080/vuelos', nuevoVuelo)
      .its('status')
      .should('eq', 200);
  });

});
