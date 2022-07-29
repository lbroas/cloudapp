describe('Settings > Avatar', () => {
  before(() => {
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
    it('displays an alert when the image exceeds size requirement', () => {
      cy.intercept('POST', '/accounts/W4Heg4el').as('uploadFile')

      cy.get('input#user_avatar')
        .attachFile('mario_cloud.jpg')

      cy.get('[data-testid="onboarding-submit-about-you-form"]')
        .click()

      cy.wait('@uploadFile').then(({ response }) => {
        expect(response.statusCode).to.eq(200)
      })

      cy.get('.alert-success')
        .should('be.visible')
        .and('have.text', 'Account updated successfully')
    })
  })

  context('when uploading an image larger than 500x500', () => {
    it('displays an alert when the image exceeds size requirement', () => {
      cy.get('input#user_avatar')
        .attachFile('mario_cloud_large.jpg')

      cy.get('[data-testid="onboarding-submit-about-you-form"]')
        .click()

      cy.get('.flash.alert-danger')
        .should('be.visible')
        .and('have.text', 'Avatar Max size is 500x500px')
    })
  })
})
