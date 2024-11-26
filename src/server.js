const http = require('http')
const port = process.env.PORT || 3000

const users = [];
const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'aaplication/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: "Erika",
      email: 'erika@gmail.com'
    })
    return res.writeHead(201).end('Create user')
  }
  return res.writeHead(404).end('Not find')
});

server.listen(port);