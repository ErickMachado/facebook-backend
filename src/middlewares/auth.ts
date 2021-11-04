import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { APIError } from '@/errors/APIError'

interface ITokenPayload {
  sub: string
}

const jwtSecret = process.env.JWT_SECRET as string

function auth(request: Request, response: Response, next: NextFunction) {
  if (!request.headers.authorization) throw new APIError('Unauthorized', 401)

  const [, token] = request.headers.authorization.split(' ')

  const { sub } = jwt.verify(token, jwtSecret) as ITokenPayload

  request.profile_id = sub

  return next()
}

export default auth
