import { Router } from 'express'
import { PublicationController } from '@/controllers/http'
import { auth, upload } from '@/middlewares'

const publicationsRoute = Router()

publicationsRoute.get('/publications', auth, PublicationController.index)
publicationsRoute.post(
  '/publications',
  auth,
  upload.single('image'),
  PublicationController.store
)

export default publicationsRoute
