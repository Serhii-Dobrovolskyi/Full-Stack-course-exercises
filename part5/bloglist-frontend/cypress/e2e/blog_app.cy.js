
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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('serh')
      cy.get('#password').type('lavr444')
      cy.contains('login').click()
      cy.contains('Serhii Dobrovol logged in')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test_title')
      cy.get('#author').type('test_author')
      cy.get('#url').type('test_url')
      cy.get('button').contains('create').click()

      cy.contains('test_title test_author')
    })
    describe('When blog is created', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('test_title')
        cy.get('#author').type('test_author')
        cy.get('#url').type('test_url')
        cy.get('button').contains('create').click()
      })
      it('users can like a blog', function () {
        cy.contains('test_title')
          .parent()
          .find('button')
          .contains('view')
          .click()
        cy.contains('test_title')
          .parent()
          .find('button')
          .contains('like')
          .click()
        cy.contains('test_title')
          .parent()
          .should('contain', 'likes 1')
      })
      it('creator can see the remove button', function () {
        cy.contains('test_title')
          .parent()
          .find('button')
          .contains('view')
          .click()
        cy.contains('test_title').parent().as('theBlog')
        cy.get('@theBlog').contains('remove')
      })
      it('other users cannot see the remove button', function () {
        cy.contains('log out').click()

        const anotherUser = {
          name: 'Another User',
          username: 'anotherUsername',
          password: 'anotherPassword',
        }
        cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
        cy.visit('http://localhost:5173/')

        cy.get('#username').type('anotherUsername')
        cy.get('#password').type('anotherPassword')
        cy.contains('login').click()
        cy.contains('Another User logged in')

        cy.contains('test_title')
          .parent()
          .find('button')
          .contains('view')
          .click()
        cy.contains('test_title').parent().as('theBlog')
        cy.get('@theBlog').should('not.contain', 'remove')
      })
    })
  })
})
