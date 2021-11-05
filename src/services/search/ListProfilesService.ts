import { prisma } from '@/prisma'

class ListProfilesService {
  public async execute(name: string) {
    const profiles = await prisma.profile.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive'
        }
      }
    })

    return profiles
  }
}

export default new ListProfilesService()
