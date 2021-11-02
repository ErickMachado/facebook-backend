import { Request, Response } from 'express'
import { CreateProfileService } from '@/services/profile'

class ProfileController {
  public async store(request: Request, response: Response) {
    const { bio, city, email, name, password, redirectLink, username } =
      request.body

    await CreateProfileService.execute(
      {
        bio,
        city,
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
