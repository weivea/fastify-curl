# fastify-curl

fastify 框架的 httpclient  
基于[urllib](https://github.com/node-modules/urllib)

## install

```
npm install fastify-curl --save
```

## usage

```javascript
const fastify = require('fastify')()

const config = {
  // ...详细信息见下方
}
app.register(curl, config)

// Declare a route
fastify.get('/', function(request, reply) {
  const option = {
    // ...详细信息见下方
  }
  const re = await app.curl('http://xxxx', option)
  console.log(re.data);
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen(3000, '0.0.0.0', function(err) {
  if (err) throw err
  console.log(
    `server listening on http://${fastify.server.address().address}:${
      fastify.server.address().port
    }`
  )
})
```

## config

```javascript
// default
{
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
```

## option

* **_method_** String - Request method, defaults to `GET`. Could be `GET`, `POST`, `DELETE` or `PUT`. Alias 'type'.
  * **_data_** Object - Data to be sent. Will be stringify automatically.
  * **_dataAsQueryString_** Boolean - Force convert `data` to query string.
  * **_content_** String | [Buffer](http://nodejs.org/api/buffer.html) - Manually set the content of payload. If set, `data` will be ignored.
  * **_stream_** [stream.Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) - Stream to be pipe to the remote. If set, `data` and `content` will be ignored.
  * **_writeStream_** [stream.Writable](http://nodejs.org/api/stream.html#stream_class_stream_writable) - A writable stream to be piped by the response stream. Responding data will be write to this stream and `callback` will be called with `data` set `null` after finished writing.
  * **_consumeWriteStream_** [true] - consume the writeStream, invoke the callback after writeStream close.
  * **_contentType_** String - Type of request data. Could be `json`. If it's `json`, will auto set `Content-Type: application/json` header.
  * **_nestedQuerystring_** Boolean - urllib default use querystring to stringify form data which don't support nested object, will use [qs](https://github.com/ljharb/qs) instead of querystring to support nested object by set this option to true.
  * **_dataType_** String - Type of response data. Could be `text` or `json`. If it's `text`, the `callback`ed `data` would be a String. If it's `json`, the `data` of callback would be a parsed JSON Object and will auto set `Accept: application/json` header. Default `callback`ed `data` would be a `Buffer`.
  * **fixJSONCtlChars** Boolean - Fix the control characters (U+0000 through U+001F) before JSON parse response. Default is `false`.
  * **_headers_** Object - Request headers.
  * **_timeout_** Number | Array - Request timeout in milliseconds for connecting phase and response receiving phase. Defaults to `exports.TIMEOUT`, both are 5s. You can use `timeout: 5000` to tell urllib use same timeout on two phase or set them seperately such as `timeout: [3000, 5000]`, which will set connecting timeout to 3s and response 5s.
  * **_auth_** String - `username:password` used in HTTP Basic Authorization.
  * **_digestAuth_** String - `username:password` used in HTTP [Digest Authorization](http://en.wikipedia.org/wiki/Digest_access_authentication).
  * **_agent_** [http.Agent](http://nodejs.org/api/http.html#http_class_http_agent) - HTTP Agent object.
    Set `false` if you does not use agent.
  * **_httpsAgent_** [https.Agent](http://nodejs.org/api/https.html#https_class_https_agent) - HTTPS Agent object.
    Set `false` if you does not use agent.
  * **_ca_** String | Buffer | Array - An array of strings or Buffers of trusted certificates.
    If this is omitted several well known "root" CAs will be used, like VeriSign.
    These are used to authorize connections.
    **Notes**: This is necessary only if the server uses the self-signed certificate
  * **_rejectUnauthorized_** Boolean - If true, the server certificate is verified against the list of supplied CAs.
    An 'error' event is emitted if verification fails. Default: true.
  * **_pfx_** String | Buffer - A string or Buffer containing the private key,
    certificate and CA certs of the server in PFX or PKCS12 format.
  * **_key_** String | Buffer - A string or Buffer containing the private key of the client in PEM format.
    **Notes**: This is necessary only if using the client certificate authentication
  * **_cert_** String | Buffer - A string or Buffer containing the certificate key of the client in PEM format.
    **Notes**: This is necessary only if using the client certificate authentication
  * **_passphrase_** String - A string of passphrase for the private key or pfx.
  * **_ciphers_** String - A string describing the ciphers to use or exclude.
  * **_secureProtocol_** String - The SSL method to use, e.g. SSLv3_method to force SSL version 3.
  * **_followRedirect_** Boolean - follow HTTP 3xx responses as redirects. defaults to false.
  * **_maxRedirects_** Number - The maximum number of redirects to follow, defaults to 10.
  * **_formatRedirectUrl_** Function - Format the redirect url by your self. Default is `url.resolve(from, to)`.
  * **_beforeRequest_** Function - Before request hook, you can change every thing here.
  * **_streaming_** Boolean - let you get the `res` object when request connected, default `false`. alias `customResponse`
  * **_gzip_** Boolean - Accept gzip response content and auto decode it, default is `false`.
  * **_timing_** Boolean - Enable timing or not, default is `false`.
  * **_enableProxy_** Boolean - Enable proxy request, default is `false`.
  * **_proxy_** String | Object - proxy agent uri or options, default is `null`.
  * **_lookup_** Function - Custom DNS lookup function, default is `dns.lookup`. Require node >= 4.0.0(for http protocol) and node >=8(for https protocol)
  * **_checkAddress_** Function: optional, check request address to protect from SSRF and similar attacks. It receive tow arguments(`ip` and `family`) and should return true or false to identified the address is legal or not. It rely on `lookup` and have the same version requirement.
* **_callback(err, data, res)_** Function - Optional callback.
  * **err** Error - Would be `null` if no error accured.
  * **data** Buffer | Object - The data responsed. Would be a Buffer if `dataType` is set to `text` or an JSON parsed into Object if it's set to `json`.
  * **res** [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage) - The response.

see details from https://github.com/node-modules/urllib
