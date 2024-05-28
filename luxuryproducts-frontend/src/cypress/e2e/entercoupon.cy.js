// cypress/integration/apply_coupon.spec.js

describe('User adds a product to the cart and applies a coupon code', () => {
  before(() => {
      // Visit the login page
      cy.visit('/app/auth/login');
      
      // Log in as a user
      cy.get('input[name="admin@admin.com"]').type('ADMIN');
      cy.get('input[name="Admin123!"]').type('password');
      cy.get('button[type="submit"]').click();
      
      // Ensure login was successful by checking for a user-specific element
      cy.contains('Welcome, user').should('exist');
  });

  it('should add a product to the cart and apply a coupon code', () => {
      // Navigate to the product page
      cy.visit('http://localhost:8080/api/products:1'); // Replace with actual product URL

      // Add the product to the cart
      cy.get('button.add-to-cart').click(); // Replace with your actual selector

      // Go to the cart page
      cy.visit('http://localhost:8080/api/cart');

      // Ensure the product was added to the cart
      cy.contains('Rolex Submariner').should('exist'); // Replace with actual product name
      
      // Capture the total price before applying the coupon
      cy.get('.total-price').invoke('text').then((totalPriceBefore) => {
          // Enter the coupon code
          cy.get('input[name="coupon"]').type('coupon1');
          cy.get('button.apply-coupon').click('submitCoupon'); // Replace with your actual selector

          // Verify the total price is updated
          cy.get('.total-price').invoke('text').should((totalPriceAfter) => {
              expect(parseFloat(totalPriceAfter)).to.be.lessThan(parseFloat(totalPriceBefore));
          });
      });
  });
});
