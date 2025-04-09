const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/notes')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => logger.info('Connected to MongoDB')).catch(err => {
   logger.error('MongoDB connection error:', err.message)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app