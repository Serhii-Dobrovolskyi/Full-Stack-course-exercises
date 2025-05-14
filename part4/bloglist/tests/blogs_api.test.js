const assert = require('node:assert')
const mongoose = require('mongoose')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/note')

const api = supertest(app)

describe.only('NoTest', () => {
  const initialBlogs = [
    { title: 'First blog', author: 'Author1', url: 'http://example.com/1', likes: 1 },
    { title: 'Second blog', author: 'Author2', url: 'http://example.com/2', likes: 2 }
  ]
  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(initialBlogs)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  test('blogs are returned as json and correct number', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })
})

// test('testTest', () => {
//   expect(2 + 2).equal(4)
// })