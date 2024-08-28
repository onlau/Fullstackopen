const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const info = require('./utilities/logger')
const blogsRouter = require('./controllers/blogs')
const {PORT, MONGODB_URI} = require('./utilities/config')

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app