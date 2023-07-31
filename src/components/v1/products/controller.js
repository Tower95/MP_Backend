'use strict'
const router = require('express').Router()
const dal = require('./dal')

router.get('/', async (req, res) => {
  let payload = undefined
  try {
    payload = await dal.getProducts()
  } catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  if (payload === undefined || payload.length === 0) {
    res.status(404)
    res.json({ error: 'Products not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

router.post('/', async (req, res) => {
  let payload = undefined

  // create the data to save
  const product = {
    user_id: req.user.id,
    name: req.body.name,
    sku: req.body.sku,
    price: req.body.price,
    quantity: req.body.quantity,
  }

  try {
    payload = await dal.save(product)
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

  // get the product
  const product = {
    id: req.params.id,
    name: req.body.name,
    sku: req.body.sku,
    price: req.body.price,
    quantity: req.body.quantity,
  }

  try {
    payload = await dal.save(product)
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
    res.json({ error: 'Product not found' })
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
    res.json({ error: 'Product not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

module.exports = router
