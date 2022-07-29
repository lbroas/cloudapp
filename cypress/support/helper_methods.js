export default {
  generateUserEmail () {
    return `test${(Cypress.dayjs().unix())}@test.com`
  },
}
