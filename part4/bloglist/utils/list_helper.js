const dummy = (blogs) => {
   return 1
}

const totalLikes = (listOfBlogPosts) => {
   return listOfBlogPosts.reduce((sum, item) => sum + item.likes, 0)
}

module.exports = {
   dummy, totalLikes
}