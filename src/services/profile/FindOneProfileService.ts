import { APIError } from '@/errors/APIError'
import { prisma } from '@/prisma'

class FindOneProfileService {
  public async execute(profile_id: string) {
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
            created_at: true,
            image_url: true,
            subtitle: true
          }
        },
        username: true
      },
      where: { id: profile_id }
    })

    if (!profile) throw new APIError('Profile does not exists', 404)

    return profile
  }
}

export default new FindOneProfileService()
