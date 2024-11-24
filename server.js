const app = require('./app');
const http = require('http')
const port = process.env.PORT || 3000

//last line of code
const server = http.createServer(app);
server.listen(port, function () {
  console.log("Servidor rodando na URL: http://localhost:" + port)
})
