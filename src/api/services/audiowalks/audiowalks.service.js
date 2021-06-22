// Initializes the `audiowalks` service on path `/api/audiowalks`
const { Audiowalks } = require('./audiowalks.class')
const hooks = require('./audiowalks.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    minio: app.get('minio')
  }

  function streamResponse (req, res, next) {
    if (res.hook.result) {
      const { aac, jpg, m4a, mp3, md } = res.hook.params.query
      if (jpg) {
        res.setHeader('Content-Type', 'image/jpeg')
      }
      if (mp3) {
        res.setHeader('Content-Type', 'audio/mp3')
      }
      if (aac) {
        res.setHeader('Content-Type', 'audio/aac')
      }
      if (m4a) {
        res.setHeader('Content-Type', 'audio/m4a')
      }
      if (md) {
        res.setHeader('Content-Type', 'text/plain')
      }
      res.hook.result.pipe(res)
    }
  }

  // Initialize our service with any options it requires
  app.use('/api/audiowalks', new Audiowalks(options, app), streamResponse)

  // Get our initialized service so that we can register hooks
  const service = app.service('api/audiowalks')

  service.hooks(hooks)
}
