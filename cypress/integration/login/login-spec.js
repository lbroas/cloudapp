describe('Logging into getcloudapp', () => {
  before(() => {
    cy.visit('/login')
  })

  context('when signing in as a valid user', () => {
    after(() => {
      cy.userNav('Sign out')
    })

    it('displays welcome message and video', () => {
      cy.signIn('validUser')

      cy.get('.alert-message')
        .should('be.visible')
        .and('have.text', 'Welcome back!')

      cy.iframe('iframe[src$="embed=true"]').within((frame) => {
        cy.get('#video-item_html5_api')
          .should('be.visible')
      })
    })
  })

  context('when signing in with invalid creds', () => {
    beforeEach(() => {
      cy.reload()
    })

    it('shows an alert when using a non registered email', () => {
      cy.signIn('nonRegisteredEmail')

      cy.get('.alert-danger').eq(1)
        .should('have.text', 'Invalid email / password combination')
    })

    it('shows an alert that the email/password is incorrect', () => {
      cy.signIn('incorrectPassword')

      cy.get('.alert-danger').eq(1)
        .should('have.text', 'Invalid email / password combination')
    })
  })
})
