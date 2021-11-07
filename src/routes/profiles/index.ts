import { Router } from 'express'
import { ProfileController } from '@/controllers/http'
import { auth } from '@/middlewares'

const profilesRoute = Router()

profilesRoute.get('/profiles/:username', auth, ProfileController.show)
profilesRoute.post('/profiles', ProfileController.store)
profilesRoute.patch('/profiles', auth, ProfileController.update)
profilesRoute.delete('/profiles', auth, ProfileController.delete)

export default profilesRoute
