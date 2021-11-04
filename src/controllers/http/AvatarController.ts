import { Request, Response } from 'express'
import UpdateAvatarService from '@/services/avatar/UpdateAvatarService'
import { IBaseController } from '@/@types/controller'

class AvatarController implements IBaseController {
  async store(request: Request, response: Response) {
    const url = await UpdateAvatarService.execute({
      image_path: request.file!.path,
      profile_id: request.profile_id
    })

    return response.status(200).json({ url })
  }
}

export default new AvatarController()
