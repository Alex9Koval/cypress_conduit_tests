const COMMENT_INPUT = '[placeholder="Write a comment..."]';
const COMMENT_BTN = '[type=submit]';
const DELETE_COMMENT_BTN = '(//i[@class="ion-trash-a" and @ng-click])[1]';

describe('Comment functionality', () => {
    before(() => {
        cy.loginDefaultUser();
        cy.getToken().as('token');
      });
    
      beforeEach(function () {
        cy.visit('/#'); // for test article/Random-article-title1655306639641-56518
        localStorage.setItem('jwtToken', this.token);
      });
  
    it('add comment in article', () => {
      cy.get('.ng-scope .article-preview').should('contain', 'No articles are here... yet.');
      cy.xpath('//a[contains(text(),"Global Feed")]').click();
      cy.get('article-preview').should('contain', 'Random topi for an article');
      cy.xpath('(//h1[contains(text(),"Random article")])[1]').click(); 
      cy.contains('p', 'Here goes the article itself');
      cy.get(COMMENT_INPUT).type('Add comment');
      cy.get(COMMENT_BTN).click();
      cy.get('.card-text.ng-binding').should('contain', 'Add comment');
    });

    //no functionality to edit an existing comment, just for testing
    it('edit comment', () => {
      cy.xpath('//a[contains(text(),"Global Feed")]').click();
      cy.xpath('(//h1[contains(text(),"Random article")])[1]').click();
      cy.contains('p', 'Here goes the article itself');
      cy.get(COMMENT_INPUT).type('Edit comment');
      cy.get(COMMENT_BTN).click();
      cy.get('.card-text.ng-binding').should('contain', 'Edit comment');
    });

    it('delete comment', () => {
      cy.xpath('//a[contains(text(),"Global Feed")]').click();
      cy.xpath('(//h1[contains(text(),"Random article")])[1]').click();
      cy.xpath(DELETE_COMMENT_BTN).click();
    });
});