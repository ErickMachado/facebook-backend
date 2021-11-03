import { Request, Response } from 'express'
import { CreateProfileService } from '@/services/profile'
import { IBaseController } from '@/@types/controller'

class ProfileController implements IBaseController {
  public async store(request: Request, response: Response) {
    const { email, name, password, redirectLink, username } = request.body

    await CreateProfileService.execute(
      {
        email,
        name,
        password,
        username
      },
      redirectLink
    )

    return response.sendStatus(201)
  }
}

export default new ProfileController()
