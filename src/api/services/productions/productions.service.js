// Initializes the `productions` service on path `/productions`
const { Productions } = require('./productions.class')
const createModel = require('../../models/productions.model')
const hooks = require('./productions.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/productions', new Productions(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('productions')

  service.hooks(hooks)
}
