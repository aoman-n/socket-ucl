const cookie = require('cookie');
const app = require('express')()
const http = require('http').createServer(app)
// const io = require('socket.io')(http);

const io = require('socket.io')(http, {
  // path: '/example',
  // serveClient: false,
  // // below are engine.IO options
  // pingInterval: 10000,
  // pingTimeout: 5000,
  // cookie: false
})

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/hello', (req, res) => {
  res.json({ hello: 'ok' })
});

const exampleNamespace = io.of('/example')

exampleNamespace.use((socket, next) => {
  console.log('example middleware')
  next()
})

exampleNamespace.on('connection', (socket) => {
  console.log('connected!')

  const cookies = cookie.parse(socket.request.headers.cookie || '');
  const headers = socket.handshake.headers
  const url = socket.handshake.url
  const queries = socket.handshake.query

  console.log({ cookies, headers, queries, url })

  socket.on('message', (msg) => {
    console.log(`receive msg: ${msg}`)

    exampleNamespace.emit('message', msg)
  })

  socket.on('disconnect', () => {
    console.log('disconnected!')
  })

  socket.on('error', (error) => {
    console.log('errro: ', error)
  });
})

http.listen(PORT, () => {
  console.log(`socke.io listening on *:${PORT}`)
})