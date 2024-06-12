
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { initialBlogs, blogsInDb, nonExistingId } = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const newBlog = {
    title: "New Blog",
    author: "Jean DONG",
    url: "http://fakeurl.html",
    likes: 4,
}

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

test ('Default likes propertie value is 0' , async () => {
    const {likes, ...blog} = newBlog


    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    savedblog = response.body.pop()
    assert.strictEqual(savedblog.likes, 0)    
})

test ('title or url properties are not missing from the request data', async() => {
    var {title, ...blog} = newBlog
    
    response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.error,'Blog validation failed: title: Path `title` is required.')

    var {url, ...blog} = newBlog
    response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)    
    .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.error,'Blog validation failed: url: Path `url` is required.')
})

describe('updating a blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await blogsInDb()

      const blogToUpdate = blogsAtStart[0]

      const resultblog = await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .set({likes: '13'})
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultblog.body, blogToUpdate)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await nonExistingId()

      await api
        .patch(`/api/blogs/${validNonexistingId}`)
        .set({likes: '13'})
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .patch(`/api/blogs/${invalidId}`)
        .set({likes: '13'})
        .expect(400)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await blogsInDb()
        
        const blogToDelete = blogsAtStart[0]

        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

        const blogsAtEnd = await blogsInDb()

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

        const urls = blogsAtEnd.map(r => r.url)
        assert(!urls.includes(blogToDelete.url))
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'
  
        await api
          .delete(`/api/blogs/${invalidId}`)
          .expect(400)
      })

      test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await nonExistingId()
  
        await api
          .delete(`/api/blogs/${validNonexistingId}`)
          .expect(404)
      })
})


after(async () => {
  await mongoose.connection.close()
})
  

