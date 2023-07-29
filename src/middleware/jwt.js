'use strict'

const jwt = require('jsonwebtoken')
const logger = require('../utils/logs')
const { response, request } = require('express')
const user = require('../components/v1/users/dal')

exports.validateJWT = async (req = request, res = response, next) => {
  const token = req.header('Authorization') || req.header('authorization')

  if (!token) {
    return res.status(401).json({
      error: 'Token not found'
    })
  }

  if (req.path === '/api/users' && req.method === 'POST') {
    return next()
  }

  if (req.path === '/api/users/login' && req.method === 'POST') {
    return next()
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await user.findOne(id)

    if (user === undefined) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    req.user = user
    next()
  } catch (error) {
    logger.error(error)
    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}

