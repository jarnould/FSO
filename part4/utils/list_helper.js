const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)
  
module.exports = {
    dummy,
    totalLikes
}