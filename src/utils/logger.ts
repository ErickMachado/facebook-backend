import pino from 'pino'

const logger = pino({
  transport: {
    options: {
      ignore: 'pid,hostname'
    },
    target: 'pino-pretty'
  }
})

export default logger
