import inquirer, { QuestionCollection } from 'inquirer'

export const types = {
  sender: 'sender',
  receiver: 'receiver',
}

export enum Types {
  Sender,
  Receiver,
}

const typeQuestion: QuestionCollection<{ type: string }> = [
  {
    type: 'list',
    name: 'type',
    message: 'TYPEを選択してください',
    choices: [types.sender, types.receiver],
  },
]

export const inquireType = async () => {
  const { type } = await inquirer.prompt(typeQuestion)
  return type
}

const urlQuestion: QuestionCollection<{ url: string }> = [
  {
    name: 'url',
    message: 'URLを入力してください',
  },
]

export const inquireUrl = async () => {
  const { url } = await inquirer.prompt(urlQuestion)
  return url
}

const receivceEventsQuestion: QuestionCollection<{ event: string }> = [
  {
    name: 'event',
    message: 'イベント名を入力してください。指定が終了したら`run`と入力',
  },
]

export const inquirerEvents = async () => {
  const events: string[] = []

  const eventLoop = async () => {
    const { event } = await inquirer.prompt(receivceEventsQuestion)
    events.push(event)

    if (event === 'run') {
      return
    }

    await eventLoop().catch((err) => {
      console.log('err: ', err)
    })
  }

  await eventLoop()

  return events
}

export interface EventPayloadAnswer {
  event: string
  payload: string
}

const senderAnswer: QuestionCollection<EventPayloadAnswer> = [
  {
    name: 'event',
    message: 'イベント名を入力してください',
  },
  {
    name: 'payload',
    message: 'payloadを入力してください',
  },
]

export const inquireEventPayload = async () => {
  return await inquirer.prompt(senderAnswer)
}
