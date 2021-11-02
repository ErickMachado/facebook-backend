import { Router } from 'express'
import { ProfileController } from '@/controllers/http'

const profilesRoute = Router()

profilesRoute.post('/profiles', ProfileController.store)

export default profilesRoute
