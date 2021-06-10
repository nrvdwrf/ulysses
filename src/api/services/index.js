const users = require('./users/users.service.js')
const productions = require('./productions/productions.service.js')
const assets = require('./assets/assets.service.js')
const buckets = require('./buckets/buckets.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(productions)
  app.configure(assets)
  app.configure(buckets)
}
