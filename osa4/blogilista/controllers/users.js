const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate("blogs")

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: 'username and password must be at least 3 characters long'
        })
    }

    users = await User.find({})


    us = users.map(u => u.username)
    if (us.includes(username)) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }


    const rounds = 1
    const passHash = await bcrypt.hash(password, rounds)

    const user = new User({
        username,
        name,
        passHash
    })

    const saved = await user.save()
    response.status(201).json(saved)

})

module.exports = usersRouter