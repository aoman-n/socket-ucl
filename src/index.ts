import readline from 'readline'
import program from 'commander'
import { connectSocket } from './socket'

program
  .name('socket-ucl')
  .version('0.0.1')
  .usage('[options]')
  .option(
    '-u, --url <URL_TO_CONNECT>',
    'Use specified <URL_TO_CONNECT> connect. it is required options.',
  )
  .option('-e, --event <EVENT_NAME...>', 'Register the specified <EVENT_NAME>')

program.parse(process.argv)

const url: string = program.url
const events: string[] = program.event || []

if (url === undefined || url === '') {
  console.log('please specify `-u` or `--url` option.')
  process.exit(1)
}

console.log({ url, events })

const commands = {
  exit: 'exit',
}

const lr = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

lr.on('close', () => {
  console.log('thank you!')
})

const questions = (socket: SocketIOClient.Socket) => {
  lr.question('eventName > ', (eventName) => {
    if (eventName === commands.exit) {
      lr.close()
      return
    }

    lr.question('payload > ', (payload) => {
      if (payload === commands.exit) {
        lr.close()
        return
      }

      socket.emit(eventName, payload)

      questions(socket)
    })
  })
}

connectSocket(
  {
    url: url,
    events: events,
  },
  questions,
)
