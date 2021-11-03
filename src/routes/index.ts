import { Router } from 'express'
import profilesRoute from './profiles'
import authroutes from './auth'

const router = Router()

router.use(profilesRoute)
router.use(authroutes)

export default router
