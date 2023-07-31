'use strict'
const router = require('express').Router()

const users = require('./users')
router.use('/users', users.controller)

const products = require('./products')
router.use('/products', products.controller)

const orders = require('./orders')
router.use('/orders', orders.controller)

exports = module.exports = router