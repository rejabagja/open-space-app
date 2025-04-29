/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    // visit login page
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // verify login ui
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // click login without username
    cy.get('button').contains(/^Login$/).click();

    // verify window alert message for empty username
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // fill username input
    cy.get('input[placeholder="Username"]').type('testuser');

    // click login without password
    cy.get('button').contains(/^Login$/).click();

    // verify window alert message for empty password
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // fill username input
    cy.get('input[placeholder="Username"]').type('testuser');

    // fill password input
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // click login
    cy.get('button').contains(/^Login$/).click();

    // verify window alert message for wrong username and password
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // fill login form input
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('test123456');

    // click login
    cy.get('button').contains(/^Login$/).click();

    // verify homepage elemen when login successfully
    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Sign out').should('be.visible');
  });
});