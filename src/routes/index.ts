import { Router } from 'express'
import profilesRoute from './profiles'

const router = Router()

router.use(profilesRoute)

export default router
