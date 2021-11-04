import { Router } from 'express'
import authroutes from './auth'
import avatarsRoute from './avatars'
import profilesRoute from './profiles'

const router = Router()

router.use(authroutes)
router.use(avatarsRoute)
router.use(profilesRoute)

export default router
