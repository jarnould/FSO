
const app = require('./app')
const {info, error} = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => info('Server running on port', config.PORT))