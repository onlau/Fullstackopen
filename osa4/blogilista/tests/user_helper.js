const user = require("../models/user")
const bcrypt = require("bcrypt")

const initialUsers = async() => {
    const rounds = 1
    const passHash1 = await bcrypt.hash("secret", rounds)
    const passHash2 = await bcrypt.hash("qwerty", rounds)

    const initialUsers = [
        {
            username: "test",
            name: "test",
            passHash: passHash1
        },
        {
            username: "abc",
            name: "def",
            passHash: passHash2
        }
    ]
    return initialUsers
}

const usersInDb = async () => {
    const users = await user.find({})
    return users.map(user => user.toJSON())
}

module.exports = {initialUsers, usersInDb}