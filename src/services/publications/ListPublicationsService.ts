import { prisma } from '@/prisma'

class ListPublicationsService {
  async execute() {
    const publications = await prisma.publication.findMany({
      orderBy: {
        created_at: 'desc'
      },
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
        subtitle: true,
        image_url: true,
        image_public_id: true
      }
    })

    return publications
  }
}

export default new ListPublicationsService()
