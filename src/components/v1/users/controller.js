'use strict'
const router = require('express').Router()
const dal = require('./dal')
const encryption = require('../../../utils/encryption')
const jwt = require('../../../utils/jwt')

router.get('/', async (req, res) => {
  let payload = undefined
  try {
    payload = await dal.getUsers()
  } catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  if (payload === undefined || payload.length === 0) {
    res.status(404)
    res.json({ error: 'Users not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

router.post('/', async (req, res) => {
  let payload = undefined

  // create the data to save
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: encryption.encrypt(req.body.password)
  }

  try {
    payload = await dal.save(user)
  }
  catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  res.status(200)
  res.json(payload)
})

router.put('/:id', async (req, res) => {
  let payload = undefined

  // get the user
  const user = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  try {
    payload = await dal.save(user)
  }
  catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  res.status(200)
  res.json(payload)
})

router.get('/:id', async (req, res) => {
  let payload = undefined

  try {
    payload = await dal.findOne(req.params.id)
  }
  catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  if (payload === undefined || payload === null) {
    res.status(404)
    res.json({ error: 'User not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

router.delete('/:id', async (req, res) => {
  let payload = undefined

  try {
    payload = await dal.delete(req.params.id)
  }
  catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  if (payload === undefined || payload === null) {
    res.status(404)
    res.json({ error: 'User not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

router.post('/login', async (req, res) => {
  let payload = undefined

  try {
    payload = await dal.findByEmail(req.body.email)
  }
  catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  if (payload === undefined || payload === null) {
    res.status(404)
    res.json({ error: 'User not found' })
    return
  }

  if (!encryption.compare(req.body.password, payload.password)) {
    res.status(401)
    res.json({ error: 'Invalid password' })
    return
  }

  const jwtPayload = {
    id: payload.id,
    name: payload.name,
    email: payload.email
  }

  payload = {
    token: jwt.sign(jwtPayload)
  }

  res.status(200)
  res.json(payload)
})



module.exports = router
