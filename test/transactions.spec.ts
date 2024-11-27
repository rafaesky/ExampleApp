import { describe } from 'node:test';
import request from 'supertest';
import { afterAll, beforeAll, it } from 'vitest';
import { app } from '../src/app';

describe('Transactions routes', () => {

  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  //Differents form of calling the tests
  // test('should be able to create a new transaction', async () => {
  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5800,
        type: 'credit'
      }).expect(201)

  })
})
