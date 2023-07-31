'use strict'
const router = require('express').Router()
const dal = require('./dal')

router.get('/', async (req, res) => {
  let payload = undefined
  try {
    payload = await dal.getOrders()
  } catch (error) {
    logger.error(error)
    res.status(500)
    res.json({ error: error.message })
    return
  }

  if (payload === undefined || payload.length === 0) {
    res.status(404)
    res.json({ error: 'Orders not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

router.post('/', async (req, res) => {
  let payload = undefined

  if (req.body.products === undefined || req.body.products.length === 0) {
    res.status(400)
    res.json({ error: 'Products are required' })
    return
  }

  let products = []

  for (let i = 0; i < req.body.products.length; i++) {
    const product = req.body.products[i]
    products.push({
      id: product.id,
      quantity: product.quantity,
    })
  }

  // create the data to save
  const order = {
    user_id: req.user.id,
    products: products
  }

  try {
    payload = await dal.save(order)
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

  // get the order
  const order = {
    id: req.params.id,
    name: req.body.name,
    sku: req.body.sku,
    price: req.body.price,
    quantity: req.body.quantity,
  }

  try {
    payload = await dal.save(order)
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
    res.json({ error: 'Order not found' })
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
    res.json({ error: 'Order not found' })
    return
  }

  res.status(200)
  res.json(payload)
})

module.exports = router
