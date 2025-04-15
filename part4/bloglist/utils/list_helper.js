const dummy = () => {
   return 1
}

const totalLikes = (listOfBlogPosts) => {
   return listOfBlogPosts.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (listOfBlogPosts) => {
   if (listOfBlogPosts.length === 0) return null;
   return listOfBlogPosts.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

module.exports = {
   dummy, totalLikes, favoriteBlog
}