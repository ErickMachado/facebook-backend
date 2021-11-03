import { Router } from 'express'
import { SignInController } from '@/controllers/http'

const profilesRoute = Router()

profilesRoute.post('/auth', SignInController.store)

export default profilesRoute
