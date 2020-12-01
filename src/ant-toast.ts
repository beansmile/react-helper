import { message } from 'antd'

function changePromise(name, defaultDuration = 3) {
  return (content, duration = defaultDuration): Promise<void> => {
    message.destroy()
    return new Promise(resolve => message[name](content, duration, resolve))
  }
}

const toast = {
  success: changePromise('success'),
  error: changePromise('error'),
  info: changePromise('info'),
  warning: changePromise('warning'),
  warn: changePromise('warn'),
  loading: changePromise('loading', 0),
  destroy: message.destroy,
}

export default toast
