const user = require("../models/user")

const initialUsers = [
    {
        username: "test",
        name: "test",
        password: "secret"
    },
    {
        username: "abc",
        name: "def",
        password: "qwerty"
    }
]

const usersInIdb = async () => {
    const users = await user.find({})
    return users.map(user => user.toJSON())
}

module.exports = {initialUsers, usersInIdb}