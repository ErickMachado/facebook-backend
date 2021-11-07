import { APIError } from '@/errors/APIError'
import { prisma } from '@/prisma'

class DeleteCommentService {
  public async execute(comment_id: string) {
    const commentExists = await prisma.comment.findFirst({
      where: { id: comment_id }
    })

    if (!commentExists) {
      throw new APIError('Comment does not exists', 404)
    }

    await prisma.comment.delete({ where: { id: comment_id } })

    return true
  }
}

export default new DeleteCommentService()
