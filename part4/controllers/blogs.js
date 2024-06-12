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

blogsRouter.delete('/:id', async (request, response) => {
    if(!await Blog.findByIdAndDelete(request.params.id))
        response.status(404).end()
    response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes }, { new: true })
    if(!updatedBlog) 
        response.status(404).end()
    response.json(updatedBlog)
})

module.exports = blogsRouter