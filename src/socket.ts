import io from 'socket.io-client'
import qs from 'query-string'

export interface Config {
  url: string
  events: string[]
}

type Callback = (socket: SocketIOClient.Socket) => void

export const connectSocket = (config: Config, callback: Callback) => {
  console.log(`try to connect. url: ${config.url}`)

  const socket = io(config.url)

  socket.on('connect', () => {
    console.log('success connect!')

    for (const e of config.events) {
      socket.on(e, (data: string) => {
        console.log('receivce data: ', JSON.stringify(data))
      })
    }

    callback(socket)

    socket.disconnect()
  })

  socket.on('disconnect', () => {})

  socket.on('connect_error', () => {
    console.log('failed to connect.')
  })
}
