'use strict'

const jwt = require('jsonwebtoken')
const logger = require('../utils/logs')
const { response, request } = require('express')
const user = require('../components/v1/users/dal')

exports.validateJWT = async (req = request, res = response, next) => {
  let token = req.header('Authorization') || req.header('authorization')

  if (req.path === '/api/users/' && req.method === 'POST') {
    return next()
  }

  if (req.path === '/api/users/login/' && req.method === 'POST') {
    return next()
  }

  if (!token) {
    return res.status(401).json({
      error: 'Token not found'
    })
  }

  token = token.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const myUser = await user.findOne(id)

    if (myUser === undefined) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    req.user = myUser
    next()
  } catch (error) {
    logger.error(error)
    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}

