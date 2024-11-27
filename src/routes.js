
import { randomUUID } from 'crypto';
import { Database } from './database.js';
import { buidRouterPath } from './utils/buid-routh-path.js';

const database = new Database();
export const routes = [
  {
    method: 'GET',
    path: buidRouterPath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buidRouterPath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name: name,
        email: email
      }
      database.insert('users', user)
      return res.writeHead(201).end()
    }
  }, {
    method: 'PUT',
    path: buidRouterPath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      database.update('users', id, { name, email })
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buidRouterPath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('users', id)
      return res.writeHead(204).end()
    }
  },
]