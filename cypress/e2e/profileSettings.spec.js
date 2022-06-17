const HOME_BTN = '[(//a[contains(text(),"Home")])[2]';

describe('Profile Settings Page', () => {
  before(() => {
    cy.loginDefaultUser();
    cy.getToken().as('token');
    cy.visit('/#/settings');
  });

  beforeEach(function () {
    localStorage.setItem('jwtToken', this.token);
  });

  it('has valid header', () => {
    cy.contains('h1', 'Your Settings');
  });

  it('Home header link is correct', () => {
    cy.xpath('(//a[contains(text(),"Home")])[2]');//as('Home');
    cy.xpath('(//a[contains(text(),"Home")])[2]').should('contain', 'Home');
    cy.xpath('(//a[contains(text(),"Home")])[2]').invoke('attr', 'href').should('be.equal', '#/');
  });
  
  it('New Article header link is correct', () => {
    cy.get('.nav-item [ui-sref="app.editor"]').as('newArticle');
    cy.get('@newArticle').contains('New Article');
    cy.get('@newArticle').invoke('attr', 'href').should('be.equal', '#/editor/');
  });

  it('active header link is correct', () => {
    cy.get('.navbar .active').as('settingsItem');
    cy.get('@settingsItem').contains('Settings');
    cy.get('@settingsItem').invoke('attr', 'href').should('be.equal', '#/settings');
  });

  it('UserProfile header link is correct', () => {
    cy.get('[class="nav-link ng-binding"]').as('userProfile');
    cy.get('@userProfile').contains('alexqaalex9');
    cy.get('@userProfile').invoke('attr', 'href').should('be.equal', '#/@alexqaalex9');
  });

  it('logs out', () => {
    cy.contains('button', 'Or click here to logout.').click();
    cy.url().should('equal', Cypress.config('baseUrl') + '#/');
    cy.getToken().should('equal', null);
  });
});
