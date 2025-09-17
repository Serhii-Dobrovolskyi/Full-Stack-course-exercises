describe('Blog app', function () {
  beforeEach(function () {
    // cy.get('#username').type('serh')
    // cy.get('#password').type('lavr444')
    // cy.contains('login').click()
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
    cy.contains('to application')

  })
})