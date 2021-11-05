import { Router } from 'express'
import authroutes from './auth'
import avatarsRoute from './avatars'
import profilesRoute from './profiles'
import publicationsRoute from './publications'

const router = Router()

router.use(authroutes)
router.use(avatarsRoute)
router.use(profilesRoute)
router.use(publicationsRoute)

export default router
