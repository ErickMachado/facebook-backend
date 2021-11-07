import { Request, Response } from 'express'
import { IBaseController } from '@/@types/controller'
import {
  ListPublicationsService,
  CreatePublicationService,
  UpdatePublicationService,
  DeletePublicationService
} from '@/services/publications'

class PublicationController implements IBaseController {
  public async delete(request: Request, response: Response) {
    const { id } = request.params

    await DeletePublicationService.execute(id)

    return response.sendStatus(200)
  }

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

  public async update(request: Request, response: Response) {
    const { subtitle, image_public_id } = request.body
    const { id } = request.params

    const publication = await UpdatePublicationService.execute({
      subtitle,
      id,
      image_public_id,
      image_path: request.file?.path || null
    })

    return response.status(200).json(publication)
  }
}

export default new PublicationController()
