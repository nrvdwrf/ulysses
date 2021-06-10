/* eslint-disable no-unused-vars */
const Minio = require('minio')
exports.Assets = class Assets {
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
      const objectStream = await this.client.listObjects(params.query.bucket)
      const data = await new Promise((resolve, reject) => {
        const results = []
        objectStream.on('data', obj => results.push(obj))
        objectStream.on('error', err => reject(err))
        objectStream.on('close', () => {
          resolve(results.map(entry => {
            return Object.assign({ _id: `${entry.prefix || ''}${entry.name || ''}` }, entry)
          }))
        })
      })
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
