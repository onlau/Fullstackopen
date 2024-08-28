const app = require('./app')
const config = require('./utilities/config')
const logger = require('./utilities/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
