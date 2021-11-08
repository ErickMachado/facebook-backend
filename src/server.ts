import 'dotenv/config'
import 'express-async-errors'
import '@/config/cdn'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import swaggerUI from 'swagger-ui-express'
import { corsConfig } from '@/config/cors'
import { APIError } from '@/errors/APIError'
import router from '@/routes'
import swaggerFile from '@/swagger.json'

const server = express()
server.use(cors(corsConfig))
server.use(express.json())
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
server.use(router)
server.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof APIError) {
      return response.status(error.statusCode).json({ error: error.message })
    }

    return response.status(500).json({ error: 'Internal server error' })
  }
)

export { server }
