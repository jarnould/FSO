const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    blog.likes = blog.likes || 0
    if(!(blog.title || blog.url)) response.status(400).json(result)
  
    result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter