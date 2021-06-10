import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../../feathers-client'

class Asset extends BaseModel {
  // constructor (data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Asset'
  // Define default properties here
  static instanceDefaults () {
    return {}
  }
}
const servicePath = 'assets'
const servicePlugin = makeServicePlugin({
  Model: Asset,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({})

export default servicePlugin
