// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload'
import helper from './helper_methods'

const dayjs = require('dayjs')

Cypress.dayjs = dayjs

Cypress.Commands.add('iframe', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
})

Cypress.Commands.add('signIn', (userType, options = {}) => {
  const types = {
    incorrectPassword: {
      email: Cypress.env('VALID_EMAIL'),
      password: Cypress.env('INCORRECT_PASSWORD'),
    },
    invalidEmail: {
      email: Cypress.env('INVALID_EMAIL'),
      password: Cypress.env('VALID_PASSWORD'),
    },
    invalidPassword: {
      email: helper.generateUserEmail(),
      password: Cypress.env('INVALID_PASSWORD'),
    },
    newUser: {
      email: helper.generateUserEmail(),
      password: Cypress.env('VALID_PASSWORD'),
    },
    nonRegisteredEmail: {
      email: helper.generateUserEmail(),
      password: Cypress.env('VALID_PASSWORD'),
    },
    validUser: {
      email: Cypress.env('VALID_EMAIL'),
      password: Cypress.env('VALID_PASSWORD'),
    },
  }
  const user = types[userType]

  cy.get('#email')
    .type(user.email)

  cy.get('#password')
    .type(user.password)

  cy.get('[type="submit"]')
    .click()
})

Cypress.Commands.add('userNav', (option) => {
  cy.get('.dropdown-menus')
    .click()

  cy.get('.dropdown-menu-right').within(() => {
    cy.contains(option)
      .click()
  })
})
