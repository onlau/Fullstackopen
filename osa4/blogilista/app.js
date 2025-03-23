const express = require('express')
const app = express()
const cors = require('cors')
require("express-async-errors")
const mongoose = require('mongoose')
const info = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const {PORT, MONGODB_URI} = require('./utils/config')

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app