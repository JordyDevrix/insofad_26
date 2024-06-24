describe('GiftcardComponent', () => {
    beforeEach(() => {
        // Ensure login is performed before each test in this describe block
        cy.login();
    });

    it('should buy a product', () => {
        // Ensure the user is logged in and has a valid token
//  expect(token, 'Token not found in localStorage. Please ensure login test is executed first.').to.exist;
       
        cy.visit("http://localhost:4200/products");
        cy.wait(3000);
        cy.get('a[data-cy="details-button"]').first().click();
        cy.wait(2000)
        cy.get('button[data-cy="add-product"]').first().click();
        cy.visit('http://localhost:4200/cart')
        cy.get('button[data-cy="place-order"]').click();
        cy.wait(1000)
        cy.visit('http://localhost:4200/orders')
        cy.get('button[data-cy="request-return"]').first().click()
        cy.get('button[data-cy="request-return"]').first().click()
        // Add your test steps for purchasing a product here
    });

    // Add more tests as needed within this describe block
});