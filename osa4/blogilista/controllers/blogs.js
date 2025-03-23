const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user")

  response.json(blogs)
})
  
blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)
    const users = await User.find({})
    us = users.map(u => u._id)
    blog.user = us[0]
    const user = await User.findById(us[0])
    const b = await blog.save()
    user.blogs = user.blogs.concat(b._id)
    await user.save()
    response.status(201).send()
  })

blogsRouter.delete('/:id', async (request,response) => {
    const r = await Blog.findByIdAndDelete(request.params.id)
    await r.status(204).send()
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