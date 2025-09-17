
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Serhii Dobrovol',
      username: 'serh',
      password: 'lavr444'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', function () {
    cy.get('button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('serh')
      cy.get('#password').type('lavr444')
      cy.contains('login').click()
      cy.contains('Serhii Dobrovol logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('serh')
      cy.get('#password').type('lavr44')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
      cy.contains('Serhii Dobrovol logged in').should('not.exist')
    })
  })
})