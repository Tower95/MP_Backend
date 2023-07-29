'use strict'
const db = require('../../../service/db/postgres/db').db
const logger = require('../../../utils/logs')

exports.getUsers = async () => {
  let data = undefined

  try {
    data = await db.User.findAll({
      attributes: ['id', 'name', 'email']
    })
  } catch (err) {
    logger.error(err)
  }

  console.log(data)
  return data
}

exports.save = async (user) => {

  let data = undefined
  try {

    if (user.id === undefined) {
      data = await db.User.create(user)
    } else {

      await db.User.update(user, {
        where: {
          id: user.id
        }
      })

      data = await this.findOne(user.id)
    }

  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.findOne = async (id) => {
  let data = undefined

  try {
    data = await db.User.findOne({
      where: {
        id: id
      }
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}

exports.findByEmail = async (email) => {
  let data = undefined

  try {
    data = await db.User.findOne({
      where: {
        email: email
      }
    })
  }
  catch (err) {
    logger.error(err)
  }

  return data
}

exports.delete = async (id) => {
  let data = undefined

  try {

    data = await db.User.destroy({
      where: {
        id: id
      }
    })
  } catch (err) {
    logger.error(err)
  }

  return data
}


