import { Request, Response } from 'express'
import { IBaseController } from '@/@types/controller'
import { ListProfilesService } from '@/services/search'

class SearchController implements IBaseController {
  public async index(request: Request, response: Response) {
    const name = request.query.name as string

    const filteredProfiles = await ListProfilesService.execute(name)

    return response.status(200).json(filteredProfiles)
  }
}

export default new SearchController()
