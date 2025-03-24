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

module.exports = {tokenExtractor}