'use strict'
const db = require('../../../service/db/postgres/db').db
const logger = require('../../../utils/logs')

exports.getOrders = async () => {
  let data = undefined

  try {
    data = await db.Order.findAll(
      {
        include: { model: db.User, as: 'user', attributes: ['id', 'name', 'email'] },
      }
    )
  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.save = async (order) => {

  let data = undefined
  try {

    if (order.id === undefined) {
      data = await db.Order.create(order)

    } else {

      await db.Order.update(order, {
        where: {
          id: order.id,

        },
      })

      data = await this.findOne(order.id)
    }

  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.findOne = async (id) => {
  let data = undefined

  try {
    data = await db.Order.findOne({
      where: {
        id: id
      },
      include: { model: db.User, as: 'user', attributes: ['id', 'name', 'email'] },
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.findByName = async (name) => {
  let data = undefined

  try {
    data = await db.Order.findOne({
      where: {
        name: name
      }
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.findByUserId = async (userId) => {
  let data = undefined

  try {
    data = await db.Order.findAll({
      where: {
        user_id: userId
      }
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.delete = async (id) => {
  let data = undefined

  try {

    data = await db.Order.destroy({
      where: {
        id: id
      }
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}


