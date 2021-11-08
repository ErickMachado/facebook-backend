import { Request, Response } from 'express'
import { CreateLikeService } from '@/services/like'
import { IBaseController } from '@/@types/controller'

class LikeController implements IBaseController {
  public async store(request: Request, response: Response) {
    const { id } = request.params
    const { profile_id } = request

    const likes = await CreateLikeService.execute({
      publication_id: id,
      profile_id
    })

    return response.status(200).json(likes)
  }
}

export default new LikeController()
