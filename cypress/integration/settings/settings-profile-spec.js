describe('Settings > Profile', () => {
  let data

  before(() => {
    cy.fixture('users').then(function (fdata) {
      data = fdata
    })

    cy.visit('/login')
    cy.signIn('validUser')
    cy.userNav('Settings')
  })

  after(() => {
    cy.clearCookies()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_session_id')
  })

  context('when uploading an image for avatar', () => {
    it('displays an alert when the image exceeds size requirement', function () {
      cy.get('[data-testid="settings-about-you-name-field"]')
        .clear()
        .type(data.registeredUser.name)

      cy.get('[data-testid="settings-about-you-company-field"]')
        .clear()
        .type(data.registeredUser.company)

      cy.get('[data-testid="settings-about-you-profile-field"]')
        .select(data.registeredUser.role)

      cy.get('[data-testid="onboarding-submit-about-you-form"')
        .click()

      cy.get('.alert-success')
        .should('be.visible')
        .and('have.text', 'Account updated successfully')

      cy.get('.toast-body')
        .should('be.visible')
        .and('have.text', 'Account updated successfully')
    })
  })
})
