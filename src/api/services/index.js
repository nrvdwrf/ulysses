const assets = require('./assets/assets.service.js')
const buckets = require('./buckets/buckets.service.js')
const audiowalks = require('./audiowalks/audiowalks.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(assets)
  app.configure(buckets)
  app.configure(audiowalks)
}
