const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false })) // Simple Data
app.use(bodyParser.json()) // Only Json

//CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Content-Type, Origin, X-Requested-With, Accept Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({})
  }
  next();
})
const userRoute = require("./routes/users");
app.use('/users', userRoute);
app.use((req, res, next) => {
  const error = new Error('Not find');
  error.status = 404;
  next(error);
})
app.use((error, req, res, next) => {
  res.status = error.status || 500;
  return res.send({
    error: {
      message: error.message || 'Internal Server Error',
    },
  });
});
module.exports = app;