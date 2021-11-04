import { Router } from 'express'
import { ProfileController } from '@/controllers/http'
import { auth } from '@/middlewares'

const profilesRoute = Router()

profilesRoute.post('/profiles', ProfileController.store)
profilesRoute.patch('/profiles', auth, ProfileController.update)

export default profilesRoute
