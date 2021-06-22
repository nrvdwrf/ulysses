/* eslint-disable no-unused-vars */
const Minio = require('minio')
const { NotImplemented } = require('@feathersjs/errors')
exports.Audiowalks = class Audiowalks {
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

  async find () {
    const result = await this.client.getObject('audiowalks', 'index.json')
    return result
  }

  get (id, params) {
    if (params.query.jpg) return this.client.getObject('audiowalks', `${id}.jpg`)
    if (params.query.mp3) return this.client.getObject('audiowalks', `${params.query.mp3}.mp3`)
    if (params.query.aac) return this.client.getObject('audiowalks', `${params.query.aac}.aac`)
    if (params.query.m4a) return this.client.getObject('audiowalks', `${params.query.m4a}.m4a`)
    if (params.query.md) return this.client.getObject('audiowalks', `${params.query.md}.md`)
    return this.client.getObject('audiowalks', `${id}.json`)
  }
}
