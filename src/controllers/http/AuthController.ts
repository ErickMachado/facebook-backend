import { Request, Response } from 'express'
import { GetProfileInfo, SignInService } from '@/services/auth'
import { IBaseController } from '@/@types/controller'

class AuthController implements IBaseController {
  public async store(request: Request, response: Response) {
    const { email, password } = request.body

    const profileWithToken = await SignInService.execute({ email, password })

    return response.status(200).json(profileWithToken)
  }

  async show(request: Request, response: Response) {
    const { profile_id } = request

    const profile = await GetProfileInfo.execute(profile_id)

    return response.status(200).json(profile)
  }
}

export default new AuthController()
