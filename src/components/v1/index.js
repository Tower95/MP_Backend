'use strict'
const router = require('express').Router()

const users = require('./users')
router.use('/users', users.controller)

exports = module.exports = router