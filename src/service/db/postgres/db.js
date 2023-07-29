'use strict'
const Sequelize = require('sequelize')

const name = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const host = process.env.DB_HOST
const type = process.env.DB_TYPE
const port = process.env.DB_PORT

const sequelize = new Sequelize(name, user, pass, {
  host,
  port,
  dialect: type,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const db = {
  User: require('../../../components/v1/users/model')(sequelize, Sequelize)
}

Object.keys(db).forEach(key => {
  if ('associate' in db[key]) {
    db[key].associate(db)
  }
})

module.exports = { db, sequelize }