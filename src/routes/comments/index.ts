import { Router } from 'express'
import { auth } from '@/middlewares'
import { CommentController } from '@/controllers/http'

const commentsRoute = Router()

commentsRoute.post('/comments', auth, CommentController.store)

export default commentsRoute
