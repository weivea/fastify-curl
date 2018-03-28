const fastify = require('fastify')({})
const curl = require('../')
fastify.register(curl)

// Declare a route
fastify.get('/', async function(request, reply) {
  const option = {
    // ...详细信息见下方
  }

  const re = await fastify.curl('https://cnodejs.org/api/v1/topics?page=0&tab=share&limit=10', {
    dataType: 'json',
  })
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