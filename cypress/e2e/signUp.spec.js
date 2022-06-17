import { EMAIL, PASSWORD, USERNAME } from '../creds';

const USERNAME_INPUT = '[type=text]';
const EMAIL_INPUT = '[type=email]';
const PWD_INPUT = '[type=password]';
const SUBMIT_BTN = '[type=submit]';
const ERR_MESSAGE = '.error-messages'; 
const CREDENTIALS_HAS_ALREADY_BEEN_TAKEN = 'li.ng-binding.ng-scope';

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/#/register');
  });

  it('correct link', () => {
    cy.contains('a', 'Need an account?').should('have.attr', 'href', '#/register');
  });

  it('does not sign up existing user', () => {
    cy.get(USERNAME_INPUT).type(USERNAME);
    cy.get(EMAIL_INPUT).type(EMAIL);
    cy.get(PWD_INPUT).type(PASSWORD);
    cy.get(SUBMIT_BTN).click();
    cy.get(CREDENTIALS_HAS_ALREADY_BEEN_TAKEN).should('contain', 'email has already been taken');
  });

  it('requires username', () => {
    cy.get(EMAIL_INPUT).type(EMAIL);
    cy.get(PWD_INPUT).type(PASSWORD);
    cy.get(SUBMIT_BTN).click();
    cy.get(ERR_MESSAGE).should('contain', "username can't be blank");
  })

  it('requires email', () => {
    cy.get(PWD_INPUT).type(PASSWORD);
    cy.get(SUBMIT_BTN).click();
    cy.get(ERR_MESSAGE).should('contain', "email can't be blank");
  });

  it('requires password', () => {
    cy.get(EMAIL_INPUT).type(EMAIL);
    cy.get(SUBMIT_BTN).click();
    cy.get(ERR_MESSAGE).should('contain', "username can't be blank");
  });
});
