// Require the framework and instantiate it
const fastify = require('fastify')()

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world from fastify' }
})

const user = require('./routes/users');
fastify.get('/users', user);

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()