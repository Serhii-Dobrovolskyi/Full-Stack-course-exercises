const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
   response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
   const blog = await Blog.findById(request.params.id)
   if (blog) {
      response.json(blog)
   } else {
      response.status(404).end()
   }
})

blogRouter.put('/:id', async (request, response) => {
   const body = request.body

   const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
   }

   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
   response.json(updatedBlog)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
   const body = request.body

   const user = request.user
   if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
   }
   const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
   })
   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save()
   response.status(201).json(savedBlog)
})


blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
   const user = request.user
   const blog = await Blog.findById(request.params.id)
   if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
   }

   if (!(blog.user.toString() === user.id.toString())) {
      return response.status(403).json({ error: 'unauthorized: only the creator can delete the blog' })
   }

   await Blog.findByIdAndDelete(request.params.id)
   response.status(204).end()
})


module.exports = blogRouter