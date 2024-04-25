/// <reference types="cypress" />

describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the homepage', () => {
    cy.get('h1').should('contain', 'Welcome to SomeCoolDiner');
  });

  it('should navigate to the reservation page', () => {
    cy.get('nav').find('a').contains('Book a Table').click();
    cy.url().should('include', '/reservation');
    cy.get('h2').should('contain', 'Table Reservation');
  });

  it('should navigate to the reservation viewing page', () => {
    cy.get('nav').find('a').contains('View your Reservation').click();
    cy.url().should('include', '/manage');
    cy.get('h2').should('contain', 'Manage Reservations');
  });
});
