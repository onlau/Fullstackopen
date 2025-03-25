const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const auth = request.get('Authorization')
    if (auth) {        
        if (auth.startsWith('Bearer ')) {
            request.token = auth.replace('Bearer ', '')
        }
        request.token = auth.replace('Bearer ', '')
    }
    next()
}

const userExtractor = (request, response, next) => {
    if (request.token) {
        const user = jwt.verify(request.token, process.env.SECRET)
        request.user = user.id.toString()
    }
    next()
}

module.exports = {tokenExtractor, userExtractor}