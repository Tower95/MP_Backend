'use strict'

const chalk = require('chalk')

exports.fatal_error = (err) => {
  console.error(`${chalk.red('[APP|FATAL ERROR]')} ${err}`)
  console.error(err.stack)
  process.exit(1)
}

exports.error = (err) => {
  console.error(`${chalk.red('[APP|ERROR]')} ${err}`)
  console.error(err.stack)
}

exports.info = (msg) => {
  console.log(`${chalk.blue('[APP|INFO]')} ${msg}`)
}

exports.debug = (msg) => {
  console.log(`${chalk.yellow('[APP|DEBUG]')} ${msg}`)
}
