const {test, after, beforeEach} = require("node:test")
const mongoose = require("mongoose")
const assert = require("node:assert")
const supertest = require("supertest")
const app = require("../app")
const {initialBlogs, blogsInDb} = require("./test_helper")
const api = supertest(app)
const blog = require("../models/blog")

beforeEach(async () => {
    await blog.deleteMany({})
    await blog.insertMany(initialBlogs)
})

test("two blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, 2)
})

test("identification field named id", async () => {
    const response = await api.get("/api/blogs")
    body = response.body.map(r => r.id)
    assert(!body.includes(undefined))
})

test("blogs can be added", async () => {
    const newBlog = {
        title: "abababab",
        author: "blablabla",
        url: "123213213213",
        likes: 123
    }

    await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

    const r = await api.get("/api/blogs")

    assert.strictEqual(r.body.length, initialBlogs.length+1)
})

test("zero likes by default", async () => {
    const newBlog = {
        title: "abababab",
        author: "blablabla",
        url: "123213213213"
    }

    await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

    const r = await api.get("/api/blogs")

    likes=r.body.map(b => b.likes)

    assert(likes[likes.length-1]==0)

})

test("no url", async () => {
    const newBlog = {
        title: "abababab",
        author: "blablabla",
    }

    await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("no title", async () => {
    const newBlog = {
        author: "blablabla",
        url: "asdsadsa"
    }

    await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("deletion", async () => {
    const r = await api.get("/api/blogs")

    const ids = r.body.map(b => b.id)

    await api.delete(`/api/blogs/${ids[0]}`)

    const d = await api.get("/api/blogs")

    const n = d.body.map(b => b.title)
    assert.strictEqual(n.length,initialBlogs.length-1)
})

test("update", async () => {
    const r = await api.get("/api/blogs")

    const ids = r.body.map(b => b.id)

    const newBlog = {
        title: "abababab",
        author: "blablabla",
        url: "123213213213",
        likes: 432154
    }

    await api
    .put(`/api/blogs/${ids[0]}`)
    .send(newBlog)
    .expect(200)

    const d = await api.get("/api/blogs")

    const n = d.body.map(b => b.likes)
    assert(n.includes(432154))
})


after (async () => {
    await mongoose.connection.close()
})