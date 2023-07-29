'use strict'
// Load env variables.
require('dotenv').config()

// Load express.
const express = require('express')
const app = express()
const logger = require('./src/utils/logs')
const { sequelize } = require('./src/service/db/postgres/db')

// sync the database
sequelize.sync({ force: false }).then(() => {
  logger.info('Database & tables created!')
})

// Eneable cors
const cors = require('cors')
app.use(cors())

// Parse the body.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// add static files
app.use(express.static('public'))

// Load middleware.
const validateJWT = require('./src/middleware/jwt').validateJWT
app.use(validateJWT)

// Load routes.
const v1 = require('./src/components/v1')
app.use('/api', v1)

exports = module.exports = app