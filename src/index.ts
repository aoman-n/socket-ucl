import program from 'commander'
import { sendEventer, receiveEvents, sendSocketCallback } from './socket'
import { inquireEventPayload, types } from './questions'
import { scanUrl, scanType, scanEvents } from './scanner'

program
  .name('socket-ucl')
  .version('0.0.1')
  .usage('[options]')
  .option('-t, --type <TYPE>', 'hogehoge')
  .option(
    '-u, --url <URL_TO_CONNECT>',
    'Use specified <URL_TO_CONNECT> connect. it is required options.',
  )
  .option('-e, --event <EVENT_NAME...>', 'Register the specified <EVENT_NAME>')

program.parse(process.argv)

const main = async () => {
  const type: string = await scanType(program.type)
  const url: string = await scanUrl(program.url)

  if (type === types.sender) {
    sendEventer({ url }, sendSocketCallback(inquireEventPayload))
  } else if (type === types.receiver) {
    const events: string[] = await scanEvents(program.event)
    receiveEvents({ url, events })
  } else {
    console.log('I was handed an unexpected type. specify `sender` or `receiver`')
  }
}

main().catch((err) => {
  console.log('err: ', err)
})
