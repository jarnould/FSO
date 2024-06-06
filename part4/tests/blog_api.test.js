
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { initialBlogs } = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})
  
test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
})


test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const namedId = response.body.filter(r => r.id !== undefined )
    assert.strictEqual(namedId.length, response.body.length)
}) 

test ('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlog = {
        title: "New Blog",
        author: "Jean DONG",
        url: "http://fakeurl.html",
        likes: 4,
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    savedblog = response.body.pop()
    delete savedblog.id
    assert.deepStrictEqual(savedblog, newBlog)
})

test ('if the likes property is missing from the request, it will default to the value 0' , async () => {
    const newBlog = {
        title: "New Blog",
        author: "Jean DONG",
        url: "http://fakeurl.html",
    } 

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    savedblog = response.body.pop()
    assert.strictEqual(savedblog.likes, 0)    
})
 
after(async () => {
  await mongoose.connection.close()
})
  

