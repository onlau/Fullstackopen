const Blog = require("../models/blog")

let initialBlogs = [
    {
        title: "abc",
        author: "def",
        url: "123",
        likes: 0
    },
    {
        title: "qwe",
        author: "rty",
        url: "456",
        likes: 1
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {initialBlogs, blogsInDb}