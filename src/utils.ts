import type {QuizQuestion} from '../server/types'

export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals < 0 ? 0 : decimals))} ${sizes[i]}`
}

export function getFileExtension(name: string) {
  const splitted = name.split('.')
  return splitted[splitted.length - 1].toLowerCase()
}

export function formatUuid(uuid: string) {
  return uuid.substring(28).toUpperCase()
}

export function isQuizAnswerCorrect(q: QuizQuestion) {
  return q.studentAnswer?.trim() === q.answer?.trim()
}

export function dateTime(time?: number | string) {
  const date = time ? new Date(typeof time === 'string' ? parseInt(time) : time) : new Date(Date.now())
  return date.toLocaleDateString()
}

export const week = 1000 * 60 * 60 * 24 * 7