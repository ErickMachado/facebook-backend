import { prisma } from '@/prisma'

class DeletePublicationService {
  public async execute(publicationId: string) {
    await prisma.publication.delete({ where: { id: publicationId } })

    return true
  }
}

export default new DeletePublicationService()
