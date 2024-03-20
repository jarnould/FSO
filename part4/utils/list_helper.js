const blog = require("../models/blog")
var _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)
const favoriteBlog = (blogs) => blogs.slice(1).reduce((mostLiked, blog) => mostLiked.likes >= blog.likes ? mostLiked : blog, blogs[0])   
const mostBlogs = (blogs) => _.maxBy(_.map(_.countBy(blogs,'author'), (val,key) => ({author: key, blogs: val})),'blogs') 


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}





