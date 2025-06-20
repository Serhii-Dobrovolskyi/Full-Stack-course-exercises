const assert = require('node:assert')
const mongoose = require('mongoose')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('viewing a blogs', () => {
    test('blogs are returned as json and correct number', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blog posts have id property instead of _id', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]

      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

  describe('adding a blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'test',
        author: 'Serhii',
        url: 'test',
        likes: 22
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const authors = response.body.map(r => r.author)

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
      assert(authors.includes('Serhii'))
    })

    test('if likes property is missing, it will default to 0', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Serhii',
        url: 'testUrl'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('fails with 400 if title is missing', async () => {
      const newBlog = {
        author: 'Serhii',
        url: 'testUrl',
        likes: 5
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('fails with 400 if url is missing', async () => {
      const newBlog = {
        title: 'testTitle',
        author: 'Serhii',
        likes: 5
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
      const blogsAtEnd = await api.get('/api/blogs')
      assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
    })
  })
  describe('updating a blog', () => {
  test('succeeds in updating the number of likes', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updatedData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 10
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)
    assert.strictEqual(response.body.title, blogToUpdate.title)
    assert.strictEqual(response.body.author, blogToUpdate.author)
    assert.strictEqual(response.body.url, blogToUpdate.url)
  })
})
})

after(async () => {
  await mongoose.connection.close()
})
