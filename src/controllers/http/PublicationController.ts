import { Request, Response } from 'express'
import { IBaseController } from '@/@types/controller'
import {
  CreatePublicationService,
  ListPublicationsService
} from '@/services/publications'

class PublicationController implements IBaseController {
  public async index(request: Request, response: Response) {
    const publications = await ListPublicationsService.execute()

    return response.status(200).json(publications)
  }

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
