/// <reference types="cypress" />

describe('The reservation page', () => {
  beforeEach(() => {
    cy.visit('/reservation');
  });

  it('should allow the user to make a reservation', () => {
    cy.get('nav').find('a').contains('Book a Table').click();
    cy.get('input[name="reservation_date"]').click();
    cy.get('.react-datepicker__navigation--next').click();
    cy.get('.react-datepicker__day--010').click();
    cy.get('input[name="reservation_date"]').should(
      'have.value',
      'May 10, 2024'
    );
    cy.get('select[name="reservation_time"]')
      .select('15:00')
      .should('have.value', '15:00');
    cy.get('input[name="customer_name"]').type('John Doe');
    cy.get('input[name="customer_email"]').type(
      'xicofef485@buzblox.com'
    );
    cy.get('select[name="customer_count"]').select('2');
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify').should('contain', 'Reservation successful!');
  });
});
