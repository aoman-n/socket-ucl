import program from 'commander'
import { sendEventer, receiveEvents, sendSocketCallback } from './socket'
import { inquireEventPayload, types } from './questions'
import { scanUrl, scanType, scanEvents, scanQueries } from './scanner'

program
  .name('socket-ucl')
  .version('0.0.1')
  .usage('[options]')
  .option('-t, --type <TYPE>', '')
  .option(
    '-u, --url <URL_TO_CONNECT>',
    'Use specified <URL_TO_CONNECT> connect. it is required options.',
  )
  .option('-q, --query <QUERY_STRING...>', 'key=value')
  .option('-e, --event <EVENT_NAME...>', 'Register the specified <EVENT_NAME>')

program.parse(process.argv)

interface Args {
  type: string | undefined
  url: string | undefined
  queries: string[] | undefined
  events: string[] | undefined
}

const main = async (args: Args) => {
  const type: string = await scanType(args.type)
  const url: string = await scanUrl(args.url)
  const queries: string[] = scanQueries(args.queries)

  if (type === types.sender) {
    sendEventer({ url, queries }, sendSocketCallback(inquireEventPayload))
  } else if (type === types.receiver) {
    const events: string[] = await scanEvents(args.events)
    receiveEvents({ url, events, queries })
  } else {
    console.log('I was handed an unexpected type. specify `sender` or `receiver`')
  }
}

const args = {
  type: program.type,
  url: program.url,
  queries: program.query,
  events: program.event,
}

main(args).catch((err) => {
  console.log('err: ', err)
})
