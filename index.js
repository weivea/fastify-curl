'use strict';
const HttpClient = require('./lib/httpclient')

const plugin = function(fastify, opts, next) {
  const client = new HttpClient(opts)
  fastify.decorate('httpclient', client)
  fastify.decorate('curl', (url, opts) => {
    return fastify.httpclient.request(url, opts);
  })
  next()
}
plugin[Symbol.for('skip-override')] = true
module.exports = plugin