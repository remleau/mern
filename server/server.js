require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
// require('./database.js').init();

const server = app.listen(config.db.port);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); // support parsing of application/x-www-form-urlencoded post data
app.use(require('./middlewares/AuthMiddleware')); // Check if user logged in

// Live Routes
require('./routes/Sockets')(io);

// Routes
app.use('/api', require('./routes'));