import logger from '@/utils/logger'
import { server } from '@/server'

server.listen(process.env.PORT, () => {
  logger.info('Server running 🔥')
})
