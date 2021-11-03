import { Request, Response } from 'express'
import SignInService from '@/services/auth/SignInService'
import { IBaseController } from '@/@types/controller'

class SignInController implements IBaseController {
  public async store(request: Request, response: Response) {
    const { email, password } = request.body

    const profileWithToken = await SignInService.execute({ email, password })

    return response.status(200).json(profileWithToken)
  }
}

export default new SignInController()
