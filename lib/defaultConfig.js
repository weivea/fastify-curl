module.exports = {
  httpclient: {
    request: {
      timeout: 5000
    },
    httpAgent: {
      keepAlive: true,
      freeSocketKeepAliveTimeout: 4000,
      maxSockets: 9007199254740991,
      maxFreeSockets: 256
    },
    httpsAgent: {
      keepAlive: true,
      freeSocketKeepAliveTimeout: 4000,
      maxSockets: 9007199254740991,
      maxFreeSockets: 256
    }
  }
}
