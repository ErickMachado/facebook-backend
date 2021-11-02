import { CorsOptions } from 'cors'

const corsConfig: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' ? '' : '*'
}

export { corsConfig }
