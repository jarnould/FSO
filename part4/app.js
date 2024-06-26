const express = require('express')
const app = express()
require('express-async-errors')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)

module.exports = app