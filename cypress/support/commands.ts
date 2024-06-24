/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export {};//

declare global {
    namespace Cypress {
      interface Chainable {
        login(): Chainable<void>;
      }
    }
  }

  Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/account/login',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            email: 'bob@bobsluxuryenterprise.com',
            password: 'Test123!',
        },
    }).then((response) => {
        // Check if login was successful
        // expect(response.status).to.eq(200);
        // expect(response.body).to.have.property('token');

        // Store token in localStorage
        const token = response.body.token;
        localStorage.setItem('token', token);

        // Fetch user profile
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/api/account',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Set Authorization header with token
            },
        }).then((profileResponse) => {
            // Store user profile in localStorage
            localStorage.setItem('currentUser', JSON.stringify(profileResponse.body));

            // Optionally verify localStorage content
            // expect(localStorage.getItem('currentUser')).to.eq(JSON.stringify(profileResponse.body));
        });
    });
});
