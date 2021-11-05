import { prisma } from '@/prisma'
import { IProfile } from '@/@types/profile'

type UpdatePayload = Pick<IProfile, 'bio' | 'city'>

class UpdateProfileService {
  async execute({ bio, city }: UpdatePayload, profile_id: string) {
    const profile = await prisma.profile.update({
      data: {
        bio: bio || null,
        city: city || null
      },
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
        publications: true,
        username: true
      },
      where: { id: profile_id }
    })

    return profile
  }
}

export default new UpdateProfileService()
