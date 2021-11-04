import { Request, Response } from 'express'
import { CreateProfileService, UpdateProfileService } from '@/services/profile'
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

  public async update(request: Request, response: Response) {
    const { profile_id } = request
    const { bio, city } = request.body

    const updatedProfile = await UpdateProfileService.execute(
      { bio, city },
      profile_id
    )

    return response.status(200).json(updatedProfile)
  }
}

export default new ProfileController()
