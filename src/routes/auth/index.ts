import { Router } from 'express'
import { AuthController } from '@/controllers/http'

const profilesRoute = Router()

profilesRoute.get('/auth', AuthController.show)
profilesRoute.post('/auth', AuthController.store)

export default profilesRoute
