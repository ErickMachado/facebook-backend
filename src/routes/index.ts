import { Router } from 'express'
import authroutes from './auth'
import avatarsRoute from './avatars'
import commentsRoute from './comments'
import likesRoute from './likes'
import profilesRoute from './profiles'
import publicationsRoute from './publications'
import searchRoute from './search'

const router = Router()

router.use(authroutes)
router.use(avatarsRoute)
router.use(profilesRoute)
router.use(publicationsRoute)
router.use(searchRoute)
router.use(commentsRoute)
router.use(likesRoute)

export default router
