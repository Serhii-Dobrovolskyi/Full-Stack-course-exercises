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

const mostBlogs = (listOfBlogPosts) => {
   const authorCounts = {}
   for (let i of listOfBlogPosts) {
      if (authorCounts[i.author]) {
         authorCounts[i.author]++
      } else {
         authorCounts[i.author] = 1
      }
   }
   const mostObj = Object.entries(authorCounts).reduce((most, item) => item[1] > most[1] ? item : most)
   return { author: mostObj[0], blogs: mostObj[1] }
}

const mostLikes = (listOfBlogPosts) => {
   const authorLikeCounts = {}
   for (let i of listOfBlogPosts) {
      if (authorLikeCounts[i.author]) {
         authorLikeCounts[i.author] += i.likes
      } else {
         authorLikeCounts[i.author] = i.likes
      }
   }
   const mostLikeObj = Object.entries(authorLikeCounts).reduce((most, item) => item[1] > most[1] ? item : most)
   return { author: mostLikeObj[0], likes: mostLikeObj[1] }
}

module.exports = {
   dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}