import { Request, Response } from 'express'
import {
  CreateCommentService,
  DeleteCommentService,
  UpdateCommentService
} from '@/services/comment'
import { IBaseController } from '@/@types/controller'

class CommentController implements IBaseController {
  public async delete(request: Request, response: Response) {
    const { id } = request.params

    await DeleteCommentService.execute(id)

    return response.sendStatus(200)
  }

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

  public async update(request: Request, response: Response) {
    const { id } = request.params
    const { text } = request.body

    const updatedComment = await UpdateCommentService.execute({
      comment_id: id,
      text
    })

    return response.status(200).json(updatedComment)
  }
}

export default new CommentController()
