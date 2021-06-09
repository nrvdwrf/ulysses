import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../../feathers-client'

class User extends BaseModel {
  // constructor (data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Production'
  // Define default properties here
  static instanceDefaults () {
    return {}
  }
}
const servicePath = 'productions'
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({})

export default servicePlugin
