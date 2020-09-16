import { inquirerEvents, inquireUrl, types, inquireType } from './questions'

// 必須パラメータ
export const scanUrl = async (url: string | undefined) => {
  if (url) {
    return url
  }

  return await inquireUrl()
}

// 必須パラメータ
export const scanType = async (type: string | undefined) => {
  if (type) {
    if (Object.values(types).includes(type)) {
      return type
    }
  }

  return await inquireType()
}

// 必須パラメータ
export const scanEvents = async (events: string[] | undefined) => {
  if (events === undefined || events.length === 0) {
    return await inquirerEvents()
  }

  return events
}

// オプショナルパラメータ
export const scanQueries = (queries: string[] | undefined) => {
  if (!queries) {
    return []
  }

  return queries
}
