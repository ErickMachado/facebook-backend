import { APIError } from '@/errors/APIError'
import { prisma } from '@/prisma'

class FindOneProfileService {
  public async execute(username: string) {
    const profile = await prisma.profile.findFirst({
      select: {
        avatar: {
          select: {
            url: true
          }
        },
        bio: true,
        city: true,
        created_at: true,
        id: true,
        name: true,
        publications: {
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
            comments: {
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
                author_id: true,
                created_at: true,
                id: true,
                text: true
              },
              orderBy: {
                created_at: 'asc'
              }
            },
            created_at: true,
            image_url: true,
            likes: true,
            subtitle: true
          }
        },
        username: true
      },
      where: { username }
    })

    if (!profile) throw new APIError('Profile does not exists', 404)

    return profile
  }
}

export default new FindOneProfileService()
