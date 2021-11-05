import { Request, Response } from 'express'
import { IBaseController } from '@/@types/controller'
import CreatePublicationService from '@/services/publications/CreatePublicationService'

class PublicationController implements IBaseController {
  public async store(request: Request, response: Response) {
    const { profile_id } = request
    const { subtitle } = request.body

    const publication = await CreatePublicationService.execute({
      image_path: request.file?.path,
      profile_id,
      subtitle
    })

    return response.status(201).json(publication)
  }
}

export default new PublicationController()
