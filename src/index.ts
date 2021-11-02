import 'dotenv/config'
import express from 'express'
import logger from '@/utils/logger'

const server = express()

server.listen(process.env.PORT, () => {
  logger.info('Server running 🔥')
})
