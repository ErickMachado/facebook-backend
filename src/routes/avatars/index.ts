import { Router } from 'express'
import { auth, upload } from '@/middlewares'
import { AvatarController } from '@/controllers/http'

const avatarsRoute = Router()

avatarsRoute.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  AvatarController.store
)

export default avatarsRoute
