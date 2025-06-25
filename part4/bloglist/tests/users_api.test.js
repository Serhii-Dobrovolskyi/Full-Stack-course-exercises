const assert = require('node:assert')

const mongoose = require('mongoose')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


describe('when there are initially some users saved', () => {
   beforeEach(async () => {
      await User.deleteMany({})
      await User.insertMany(helper.initialUsers)
   })
   test('trying to create a user with a short password', async () => {
      const newUser = {
         username: 'root',
         name: 'Serhii',
         password: 'dfdgert'
      }
      await api.post('/api/users').send(newUser).expect(400)

      const response = await api.get('/api/users')
      assert.strictEqual(response.body.length, helper.initialUsers.length)

   })
})


after(async () => {
   await mongoose.connection.close()
})