beforeEach(() => {
    // Login voordat elke test begint
    cy.visit('http://localhost:4200');
    cy.get('#dropdownMenu').click();
    cy.contains('Login').click();
    cy.url().should('eq', 'http://localhost:4200/account/login');
    cy.get('form').should('exist');
    cy.get('#email').type('admin@mail.com');
    cy.get('#password1').type('Test123!!');
    cy.get('#submit').click();
});