const { authenticate } = require('@feathersjs/authentication').hooks
const disablePagination = require('../../hooks/disable-pagination')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), disablePagination()],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), authenticate('jwt')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
