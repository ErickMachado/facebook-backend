import { Router } from 'express'
import { AuthController } from '@/controllers/http'
import { auth } from '@/middlewares'

const profilesRoute = Router()

profilesRoute.get('/auth', auth, AuthController.show)
profilesRoute.post('/auth', AuthController.store)

export default profilesRoute
