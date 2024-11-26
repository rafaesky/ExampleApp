import http from 'http';
import { json } from './middlewares/json.js';
const port = process.env.PORT || 3000

const users = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name: name,
      email: email
    })
    return res.writeHead(201).end('Create user')
  }
  return res.writeHead(404).end('Not find')
});

server.listen(port);