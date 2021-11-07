import { prisma } from '@/prisma'
import { APIError } from '@/errors/APIError'

interface ICreateCommentPayload {
  profile_id: string
  publication_id: string
  text: string
}

class CreateCommentService {
  public async execute({
    profile_id,
    publication_id,
    text
  }: ICreateCommentPayload) {
    if (!text) throw new APIError('Missing param: text')

    const publicationExists = await prisma.publication.findFirst({
      where: { id: publication_id }
    })

    if (!publicationExists) {
      throw new APIError('Publication does not exists', 404)
    }

    const comment = await prisma.comment.create({
      data: {
        author_id: profile_id,
        publication_id,
        text
      },
      select: {
        author: {
          select: {
            avatar: {
              select: {
                url: true
              }
            }
          }
        },
        created_at: true,
        id: true,
        text: true
      }
    })

    return comment
  }
}

export default new CreateCommentService()
