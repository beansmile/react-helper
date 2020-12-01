import * as moment from 'moment'

export function randomString() {
  return Math.random().toString(36).substr(2, 9)
}

export function randomFileName(fileName) {
  const postfix = fileName.split('.').pop()
  return `${moment().format('YYMMDD')}/${randomString()}.${postfix}`
}
