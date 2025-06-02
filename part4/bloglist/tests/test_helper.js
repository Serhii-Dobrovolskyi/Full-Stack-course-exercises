const Blog = require('../models/blog')
const initialBlogs = [
   {
      title: 'First blog',
      author: 'Author1',
      url: 'http://example.com/1',
      likes: 1
   },
   {
      title: 'Second blog',
      author: 'Author2',
      url: 'http://example.com/2',
      likes: 2
   }
]
const nonExistingId = async () => {
   const blog = new Blog({ title: 'temp', author: 'none', url: 'none' })
   await blog.save()
   await blog.deleteOne()
   return blog._id.toString()
}

module.exports = {
   initialBlogs, nonExistingId
}