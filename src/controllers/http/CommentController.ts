import { Request, Response } from 'express'
import { CreateCommentService } from '@/services/comment'
import { IBaseController } from '@/@types/controller'

class CommentController implements IBaseController {
  public async store(request: Request, response: Response) {
    const { profile_id } = request
    const { publication_id, text } = request.body

    const comment = await CreateCommentService.execute({
      profile_id,
      publication_id,
      text
    })

    return response.status(201).json(comment)
  }
}

export default new CommentController()
