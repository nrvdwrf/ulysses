import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { iff, discard } from 'feathers-hooks-common'
import feathersVuex from 'feathers-vuex'
import axios from 'axios'

const feathersClient = feathers()
  .configure(rest(process.env.API_HOST || 'http://localhost:3030').axios(axios))
  .hooks({
    before: {
      all: [
        iff(
          context => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp')
        )
      ]
    }
  })

export default feathersClient

// Setting up feathers-vuex
const {
  makeServicePlugin,
  BaseModel,
  models,
  FeathersVuex
} = feathersVuex(feathersClient, {
  serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
  idField: '_id', // Must match the id field in your database table/collection
  whitelist: ['$regex', '$options']
})

export { makeServicePlugin, BaseModel, models, FeathersVuex }
