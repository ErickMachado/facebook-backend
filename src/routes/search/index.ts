import { Router } from 'express'
import { SearchController } from '@/controllers/http'
import { auth } from '@/middlewares'

const searchRoute = Router()

searchRoute.get('/search', auth, SearchController.index)

export default searchRoute
