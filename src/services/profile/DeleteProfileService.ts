import { prisma } from '@/prisma'

class DeleteProfileService {
  public async execute(profile_id: string) {
    await prisma.profile.delete({ where: { id: profile_id } })

    return true
  }
}

export default new DeleteProfileService()
