import { Request, Response } from 'express'
import { CreateProfileService } from '@/services/profile'

class ProfileController {
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
