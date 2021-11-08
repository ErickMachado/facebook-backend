import { APIError } from '@/errors/APIError'
import { prisma } from '@/prisma'

interface ICreateLikePayload {
  profile_id: string
  publication_id: string
}

class CreateLikeService {
  public async execute({ profile_id, publication_id }: ICreateLikePayload) {
    const profileExists = await prisma.profile.findFirst({
      where: { id: profile_id }
    })

    if (!profileExists) throw new APIError('Profile does not exists', 404)

    const publication = await prisma.publication.findFirst({
      include: { likes: true },
      where: { id: publication_id }
    })

    if (!publication) throw new APIError('Publication does not exists', 404)

    const like = publication.likes.find(
      ({ author_id }) => author_id === profile_id
    )

    console.log(publication.likes)

    if (like) {
      await prisma.like.delete({
        where: { id: like.id }
      })
    } else {
      await prisma.like.create({
        data: {
          author_id: profile_id,
          publication_id
        }
      })
    }

    const updatedPublicationLikes = await prisma.publication.findFirst({
      include: { likes: true },
      where: { id: publication_id }
    })

    return updatedPublicationLikes!.likes
  }
}

export default new CreateLikeService()
