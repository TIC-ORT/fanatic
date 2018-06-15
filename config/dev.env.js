'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FANATIC_KEY: process.env.FANATIC_KEY,
  FANATIC_BUCKET: '"fanatic-training-dev"',
  FANATIC_API: '"http://localhost:3000"'
})
