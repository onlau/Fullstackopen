const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user")

  response.json(blogs)
})
  
blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)
    const users = await User.find({})
    if (!request.token){
      return response.status(401).json({
        error: "must log in to post blogs"
      })
    }
    const decoded = jwt.verify(request.token, process.env.SECRET)
    blog.user = decoded.id
    const user = await User.findById(decoded.id)
    const b = await blog.save()
    user.blogs = user.blogs.concat(b._id)
    await user.save()
    response.status(201).send()
  })

blogsRouter.delete('/:id', async (request,response) => {
    const userid = await Blog.findById(request.params.id)
    decodedid = jwt.verify(request.token, process.env.SECRET).id
    if (userid.user.toString() != decodedid.toString()){
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