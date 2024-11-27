import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()
app.addHook('preHandler', async (request, reply) => {
  console.log("Teste")
})
app.register(cookie)
app.register(transactionsRoutes, { prefix: 'transactions' })