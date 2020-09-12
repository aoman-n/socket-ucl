import io from 'socket.io-client'
import { EventPayloadAnswer } from './questions'

export interface SenderConfig {
  url: string
}

export interface ReceiverConfig {
  url: string
  events: string[]
}

type Callback = (socket: SocketIOClient.Socket) => Promise<void>

const onDefaultEvents = (socket: SocketIOClient.Socket) => {
  socket.on('disconnect', () => {})

  socket.on('connect_error', () => {
    console.log('failed to connect.')
  })
}

export const sendEventer = ({ url }: SenderConfig, callback: Callback) => {
  console.log(`try to connect. url: ${url}`)

  const socket = io(url)

  socket.on('connect', async () => {
    console.log('success connect!')

    callback(socket).catch((err) => {
      console.log('err: ', err)
    })
  })

  onDefaultEvents(socket)
}

export const receiveEvents = ({ url, events }: ReceiverConfig) => {
  console.log(`try to connect. url: ${url}`)

  const socket = io(url)

  socket.on('connect', () => {
    console.log('success connect!')
  })

  onDefaultEvents(socket)

  const eventsStr = events.reduce((acc, cur) => `${acc}\n- ${cur}`, 'onEvents...')
  console.log(eventsStr)

  for (const e of events) {
    socket.on(e, (data: string) => {
      console.log('receivce data: ', JSON.stringify(data))
    })
  }
}

export const sendSocketCallback = (inquireEventPayload: () => Promise<EventPayloadAnswer>) => {
  const callback = async (socket: SocketIOClient.Socket) => {
    const { event, payload } = await inquireEventPayload()

    if (event === 'exit' || payload === 'exit') {
      socket.close()
    }

    socket.emit(event, payload)
    callback(socket).catch((err) => {
      console.log('err: ', err)
    })
  }

  return callback
}
