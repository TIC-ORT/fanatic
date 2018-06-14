'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FANATIC_KEY: process.env.FANATIC_KEY,
  FANATIC_BUCKET: '"fanatic-training-dev"',
  WATSON_VR_APIKEY: process.env.WATSON_VR_APIKEY
})
