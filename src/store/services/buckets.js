import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../../feathers-client'

class Bucket extends BaseModel {
  // constructor (data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Bucket'
  // Define default properties here
  static instanceDefaults () {
    return {}
  }
}
const servicePath = 'buckets'
const servicePlugin = makeServicePlugin({
  Model: Bucket,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({})

export default servicePlugin
