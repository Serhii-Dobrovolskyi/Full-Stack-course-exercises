const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // твое express-приложение
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const initialBlogs = [
    { title: 'First blog', author: 'Author1', url: 'http://example.com/1', likes: 1 },
    { title: 'Second blog', author: 'Author2', url: 'http://example.com/2', likes: 2 }
  ]

  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and correct number', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(2)
})

afterAll(async () => {
  await mongoose.connection.close()
})
