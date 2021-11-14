import { APIError } from '@/errors/APIError'
import { prisma } from '@/prisma'

class GetProfileInfo {
  async execute(profile_id: string) {
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
        email: true,
        id: true,
        name: true,
        username: true
      },
      where: { id: profile_id }
    })

    if (!profile) throw new APIError('Profile does not exists', 404)

    return profile
  }
}

export default new GetProfileInfo()
