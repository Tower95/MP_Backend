'use strict'
const db = require('../../../service/db/postgres/db').db
const logger = require('../../../utils/logs')

exports.getProducts = async () => {
  let data = undefined

  try {
    data = await db.Product.findAll(
      {
        include: { model: db.User, as: 'user', attributes: ['id', 'name', 'email'] },
      }
    )
  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.save = async (product) => {

  let data = undefined
  try {

    if (product.id === undefined) {
      data = await db.Product.create(product)
    } else {

      await db.Product.update(product, {
        where: {
          id: product.id,

        },
      })

      data = await this.findOne(product.id)
    }

  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.findOne = async (id) => {
  let data = undefined

  try {
    data = await db.Product.findOne({
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
    data = await db.Product.findOne({
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
    data = await db.Product.findAll({
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

    data = await db.Product.destroy({
      where: {
        id: id
      }
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}


