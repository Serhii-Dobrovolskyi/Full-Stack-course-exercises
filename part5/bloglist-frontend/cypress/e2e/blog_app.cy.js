
// describe('Blog app', function () {
//   beforeEach(function () {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')

//     const user = {
//       name: 'Serhii Dobrovol',
//       username: 'serh',
//       password: 'lavr444'
//     }
//     cy.request('POST', 'http://localhost:3003/api/users', user)
//     cy.visit('http://localhost:5173/')
//   })

//   it('Login form is shown', function () {
//     cy.get('button').contains('login')
//   })

//   describe('Login', function () {
//     it('succeeds with correct credentials', function () {
//       cy.get('#username').type('serh')
//       cy.get('#password').type('lavr444')
//       cy.contains('login').click()
//       cy.contains('Serhii Dobrovol logged in')
//     })

//     it('fails with wrong credentials', function () {
//       cy.get('#username').type('serh')
//       cy.get('#password').type('lavr44')
//       cy.contains('login').click()
//       cy.contains('Wrong credentials')
//       cy.contains('Serhii Dobrovol logged in').should('not.exist')
//     })
//   })
//   describe('When logged in', function () {
//     beforeEach(function () {
//       cy.get('#username').type('serh')
//       cy.get('#password').type('lavr444')
//       cy.contains('login').click()
//       cy.contains('Serhii Dobrovol logged in')
//     })

//     it('A blog can be created', function () {
//       cy.contains('new blog').click()
//       cy.get('#title').type('test_title')
//       cy.get('#author').type('test_author')
//       cy.get('#url').type('test_url')
//       cy.get('button').contains('create').click()

//       cy.contains('test_title test_author')
//     })
//     describe('When blog is created', function () {
//       beforeEach(function () {
//         cy.contains('new blog').click()
//         cy.get('#title').type('test_title')
//         cy.get('#author').type('test_author')
//         cy.get('#url').type('test_url')
//         cy.get('button').contains('create').click()
//       })
//       it('users can like a blog', function () {
//         cy.contains('test_title')
//           .parent()
//           .find('button')
//           .contains('view')
//           .click()
//         cy.contains('test_title')
//           .parent()
//           .find('button')
//           .contains('like')
//           .click()
//         cy.contains('test_title')
//           .parent()
//           .should('contain', 'likes 1')
//       })
//       it('creator can see the remove button', function () {
//         cy.contains('test_title')
//           .parent()
//           .find('button')
//           .contains('view')
//           .click()
//         cy.contains('test_title').parent().as('theBlog')
//         cy.get('@theBlog').contains('remove')
//       })
//       it('other users cannot see the remove button', function () {
//         cy.contains('log out').click()

//         const anotherUser = {
//           name: 'Another User',
//           username: 'anotherUsername',
//           password: 'anotherPassword',
//         }
//         cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
//         cy.visit('http://localhost:5173/')

//         cy.get('#username').type('anotherUsername')
//         cy.get('#password').type('anotherPassword')
//         cy.contains('login').click()
//         cy.contains('Another User logged in')

//         cy.contains('test_title')
//           .parent()
//           .find('button')
//           .contains('view')
//           .click()
//         cy.contains('test_title').parent().as('theBlog')
//         cy.get('@theBlog').should('not.contain', 'remove')
//       })
//     })
//   })
// })

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

    // ===== Добавлено для задания 5.23 =====
    describe('When several blogs exist', function () {
      beforeEach(function () {
        // A
        cy.contains('new blog').click()
        cy.get('#title').type('A title')
        cy.get('#author').type('Auth A')
        cy.get('#url').type('url-a')
        cy.contains('create').click()

        // B
        cy.contains('new blog').click()
        cy.get('#title').type('B title')
        cy.get('#author').type('Auth B')
        cy.get('#url').type('url-b')
        cy.contains('create').click()

        // C
        cy.contains('new blog').click()
        cy.get('#title').type('C title')
        cy.get('#author').type('Auth C')
        cy.get('#url').type('url-c')
        cy.contains('create').click()
      })

      it('orders blogs by likes (most liked first)', function () {
        // раскрываем все карточки, чтобы были видны лайки/кнопки
        const openDetails = (title) =>
          cy.contains(title).parent().within(() => cy.contains('view').click())

        openDetails('A title')
        openDetails('B title')
        openDetails('C title')

        // кликаем like с ожиданием обновления счётчика
        const likeNTimes = (title, times) => {
          cy.contains(title).parent().within(() => {
            for (let i = 1; i <= times; i++) {
              cy.contains('like').click()
              cy.contains(`likes ${i}`).should('be.visible')
            }
          })
        }

        likeNTimes('A title', 1) // 1 лайк
        likeNTimes('B title', 2) // 2 лайка
        likeNTimes('C title', 3) // 3 лайка

        // проверяем порядок карточек по классу .blog
        cy.get('.blog').eq(0).should('contain', 'C title')
        cy.get('.blog').eq(1).should('contain', 'B title')
        cy.get('.blog').eq(2).should('contain', 'A title')
      })
    })
    // ===== конец добавления для 5.23 =====
  })
})
