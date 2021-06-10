/* eslint-disable no-unused-vars */
const Minio = require('minio')
exports.Buckets = class Buckets {
  constructor (options) {
    this.options = options || {}
    this.initMinioClient(this.options)
  }

  initMinioClient (options = {}) {
    const config = options.minio
    if (typeof config.port !== 'number') config.port = parseInt(config.port)
    if (typeof config.useSSL !== 'boolean') config.port = !!config.port
    this.client = new Minio.Client(config)
  }

  async find (params) {
    try {
      const data = (await this.client.listBuckets()).map(bucket => Object.assign({
        _id: bucket.name
      }, bucket))
      return {
        total: data.length,
        limit: data.length,
        skip: 0,
        data
      }
    }
    catch (err) {
      throw err
    }
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    }
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return data
  }

  async update (id, data, params) {
    return data
  }

  async patch (id, data, params) {
    return data
  }

  async remove (id, params) {
    return { id }
  }
}
