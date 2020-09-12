import program from 'commander'
import { sendEventer, receiveEvents } from './socket'
import { eventsQuestion, eventPayloadQuestion } from './questions'

const types = {
  sender: 'sender',
  receiver: 'receiver',
}

program
  .name('socket-ucl')
  .version('0.0.1')
  .usage('[options]')
  .option('-t, --type <TYPE>', 'hogehoge', types.sender)
  .option(
    '-u, --url <URL_TO_CONNECT>',
    'Use specified <URL_TO_CONNECT> connect. it is required options.',
  )
  .option('-e, --event <EVENT_NAME...>', 'Register the specified <EVENT_NAME>')

program.parse(process.argv)

const main = async () => {
  const type: string = program.type
  const url: string = program.url
  const events: string[] = program.event || []

  if (type === undefined || type === '') {
    console.log('please specify `-u` or `--url` option.')
    return
  }

  if (!Object.values(types).includes(type)) {
    console.log('not allow type. please specify `sender` or `receiver`')
    return
  }

  if (url === undefined || url === '') {
    console.log('please specify `-u` or `--url` option.')
    return
  }

  if (type === types.sender) {
    sendEventer({ url }, eventPayloadQuestion)
  } else if (type === types.receiver) {
    if (events.length === 0) {
      const events = await eventsQuestion()
      receiveEvents({ url, events })
    } else {
      receiveEvents({ url, events })
    }
  }
}

main().catch((err) => {
  console.log('err: ', err)
})
