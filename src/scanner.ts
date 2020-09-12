import { inquirerEvents, inquireUrl, types, inquireType } from './questions'

export const scanUrl = async (url: string | undefined) => {
  if (url) {
    return url
  }

  return await inquireUrl()
}

export const scanType = async (type: string | undefined) => {
  if (type) {
    if (Object.values(types).includes(type)) {
      return type
    }
  }

  return await inquireType()
}

export const scanEvents = async (events: string[] | undefined) => {
  if (events === undefined || events.length === 0) {
    return await inquirerEvents()
  }

  return events
}

// if (type === undefined || type === '') {
//   console.log('please specify `-u` or `--url` option.')
//   return
// }

// if (!Object.values(types).includes(type)) {
//   console.log('not allow type. please specify `sender` or `receiver`')
//   return
// }

// if (url === undefined || url === '') {
//   console.log('please specify `-u` or `--url` option.')
//   return
// }
