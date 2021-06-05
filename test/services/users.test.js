const assert = require('assert')
const app = require('../../src/api/app')

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })
})
