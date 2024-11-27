import { describe } from 'node:test';
import request from 'supertest';
import { afterAll, beforeAll, expect, it } from 'vitest';
import { app } from '../src/app';

describe('Transactions routes', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5800,
        type: 'credit'
      }).expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5800,
        type: 'credit'
      })
    const cookies = createTransactionResponse.get('Set-Cookie');
    expect(cookies).toBeDefined();

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies || [])
      .expect(200);

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5800,
      }),
    ]);
  })
})
