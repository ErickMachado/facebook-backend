import { Request, Response } from 'express'
import {
  CreateProfileService,
  FindOneProfileService,
  DeleteProfileService,
  UpdateProfileService
} from '@/services/profile'
import { IBaseController } from '@/@types/controller'

class ProfileController implements IBaseController {
  public async delete(request: Request, response: Response) {
    const { profile_id } = request

    await DeleteProfileService.execute(profile_id)

    return response.sendStatus(200)
  }

  public async show(request: Request, response: Response) {
    const { username } = request.params

    const profile = await FindOneProfileService.execute(username)

    return response.status(200).json(profile)
  }

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
