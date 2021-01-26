const express = require('express');
const http = require("http");
const path = require('path');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const port = process.env.PORT || 4000;


io.on("connection", socket => {
  socket.emit("your id", socket.id);
  console.log(socket.id);
  socket.on("send message", body => {
    io.emit("message", body)
  })
})

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Database connected'))


app.use(express.json())
app.use(cors())
app.use('/app', routesUrls);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('server up at 4000')
})