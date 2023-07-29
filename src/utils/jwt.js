'use strict'

const jwt = require('jsonwebtoken')

exports.sign = (payload) => {

  const options = {
    expiresIn: '10h',
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, options)

  return token
}
