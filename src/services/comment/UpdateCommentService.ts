import { APIError } from '@/errors/APIError'
import { prisma } from '@/prisma'

interface IUpdateCommentPayload {
  comment_id: string
  text: string
}

class UpdateCommentService {
  public async execute({ comment_id, text }: IUpdateCommentPayload) {
    if (!text) throw new APIError('Missing param: text')

    const commentExists = await prisma.comment.findFirst({
      where: { id: comment_id }
    })

    if (!commentExists) throw new APIError('Comment does not exists', 404)

    const updatedComment = await prisma.comment.update({
      data: { text },
      select: {
        author: {
          select: {
            avatar: {
              select: {
                url: true
              }
            },
            id: true,
            name: true
          }
        },
        created_at: true,
        id: true,
        text: true
      },
      where: { id: comment_id }
    })

    return updatedComment
  }
}

export default new UpdateCommentService()
