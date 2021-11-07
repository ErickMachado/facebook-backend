import { Router } from 'express'
import { auth } from '@/middlewares'
import { CommentController } from '@/controllers/http'

const commentsRoute = Router()

commentsRoute.post('/comments', auth, CommentController.store)
commentsRoute.patch('/comments/:id', auth, CommentController.update)

export default commentsRoute
