describe('Signing out', () => {
  before(() => {
    cy.visit('/login')
  })

  context('when logging out', () => {
    it('displays an alert that the user successfully logged out', () => {
      cy.signIn('validUser')

      cy.userNav('Sign out')

      cy.get('#login-form')
        .should('be.visible')

      cy.get('.alert-success').eq(1)
        .should('be.visible')
        .and('have.text', 'Successfully Logged Out')

      cy.url()
        .should('include', 'login')
    })
  })
})
