import inquirer, { QuestionCollection } from 'inquirer'

const receivceEventsQuestion: QuestionCollection<{ event: string }> = [
  {
    name: 'event',
    message: 'イベント名を入力してください',
  },
]

export const eventsQuestion = async () => {
  const events: string[] = []

  const eventLoop = async () => {
    const { event } = await inquirer.prompt(receivceEventsQuestion)
    events.push(event)

    if (event === 'run') {
      return
    }

    eventLoop().catch((err) => {
      console.log('err: ', err)
    })
  }

  await eventLoop()

  return events
}

interface QuestionAnswer {
  event: string
  payload: string
}

const senderAnswer: QuestionCollection<QuestionAnswer> = [
  {
    name: 'event',
    message: 'イベント名を入力してください',
  },
  {
    name: 'payload',
    message: 'payloadを入力してください',
  },
]

export const eventPayloadQuestion = async (socket: SocketIOClient.Socket) => {
  const { event, payload } = await inquirer.prompt(senderAnswer)

  if (event === 'exit' || payload === 'exit') {
    socket.close()
    return
  }

  socket.emit(event, payload)
  eventPayloadQuestion(socket).catch((err) => {
    console.log('err: ', err)
  })
}
