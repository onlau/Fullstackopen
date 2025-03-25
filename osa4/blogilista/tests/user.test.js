const {test, after, beforeEach} = require("node:test")
const mongoose = require("mongoose")
const assert = require("node:assert")
const supertest = require("supertest")
const app = require("../app")
const {initialUsers, usersInDb} = require("./user_helper")
const api = supertest(app)
const user = require("../models/user")

beforeEach (async() => {
    const iu = await initialUsers()
    await user.deleteMany({})
    await user.insertMany(iu)
})

test("faulty users not created", async () => {
    newUser = {
        "username": "zz",
        "name": "fasdfdsf",
        "password": "secret"
    }

    await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
})

test("username must be unique", async () => {
    newUser = {
        "username": "test",
        "name": "fasdfdsf",
        "password": "secret"
    }

    await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
})