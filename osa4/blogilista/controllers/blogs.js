const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user")

  response.json(blogs)
})
  
blogsRouter.post('', middleware.userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.url){
      response.status(400).json({
        error: "no url"
      })
    }
    if (!blog.title){
      response.status(400).json({
        error: "no title"
      })
    }
    const users = await User.find({})
    if (!request.token){
      return response.status(401).json({
        error: "must log in to post blogs"
      })
    }
    const user = await User.findById(request.user)
    const b = await blog.save()
    user.blogs = user.blogs.concat(b._id)
    await user.save()
    response.set("Content-Type", "application/json")
    response.status(201).send()
  })

blogsRouter.delete('/:id', middleware.userExtractor, async (request,response) => {
    const userid = await Blog.findById(request.params.id)
    if (request.user.toString() != userid.user.toString()){
      return response.status(401).json({
        error: "deletion unauthorized"
      })
    }
    await Blog.findByIdAndDelete(request.params.id)
    await response.status(204).send()
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      user: body.user,
      url: body.url,
      likes: body.likes
    }
    const r = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    await response.status(200).send()
  })

module.exports = blogsRouter