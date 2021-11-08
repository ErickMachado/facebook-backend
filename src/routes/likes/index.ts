import { Router } from 'express'
import { LikeController } from '@/controllers/http'
import { auth } from '@/middlewares'

const likesRoute = Router()

likesRoute.post('/likes/:id', auth, LikeController.store)

export default likesRoute
