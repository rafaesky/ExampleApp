import { randomUUID } from 'crypto'
import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.post('/', async () => {
  const transaction = await knex('transactions').insert({
    id: randomUUID(),
    title: 'Teste',
    amount: 1000
  })
  return transaction
})
app.get('/', async () => {
  const transaction = await knex('transactions').where('amount', 1000).select('*')
  return transaction
})
app.listen({ port: 3333 }).then(() => {
  console.log('Http console server running')
})
