describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  context('when signing up with invalid credentials', () => {
    it('shows an alert that email is invalid', () => {
      cy.signIn('invalidEmail')

      cy.get('.alert-danger')
        .should('be.visible')
        .and('have.text', 'Validation failed: Email is invalid')
    })

    it('shows an alert that password does not meet requirements', () => {
      cy.signIn('invalidPassword')

      cy.get('.alert-danger')
        .should('be.visible')
        .and('have.text', 'Validation failed: Password must be at least 8 characters long, contain uppercase and lowercase letters and a number.')
    })
  })

  context('when signing up for a getcloud account', () => {
    after(() => {
      cy.visit('/dashboard')
      cy.userNav('Sign out')
    })

    it('displays a success alert that user signed up', () => {
      cy.visit('/signup')
      cy.signIn('newUser')

      cy.get('.toast-body')
        .should('have.text', 'Account created successfully')
    })
  })
})
