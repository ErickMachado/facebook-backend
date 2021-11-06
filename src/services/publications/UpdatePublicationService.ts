import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { prisma } from '@/prisma'
import { APIError } from '@/errors/APIError'

interface IUpdatePublicationPayload {
  subtitle: string
  id: string
  image_public_id: string | null
  image_path: string | null
}

class UpdatePublicationService {
  public async execute({
    subtitle,
    id,
    image_public_id,
    image_path
  }: IUpdatePublicationPayload) {
    const publication = await prisma.publication.findFirst({
      where: { id }
    })

    if (!publication) throw new APIError('Publication does not exists', 404)

    let uploadedImage

    if (image_path && !image_public_id) {
      uploadedImage = await cloudinary.uploader.upload(image_path, {
        folder: process.env.CLOUDINARY_POSTS_FOLDER,
        transformation: {
          height: 630,
          width: 1200
        },
        unique_filename: true
      })

      fs.rmSync(image_path)
    }

    if (!image_path && image_public_id) {
      await cloudinary.uploader.destroy(image_public_id)
    }

    if (image_path && image_public_id) {
      await cloudinary.uploader.destroy(image_public_id)

      uploadedImage = await cloudinary.uploader.upload(image_path, {
        folder: process.env.CLOUDINARY_POSTS_FOLDER,
        transformation: {
          height: 630,
          width: 1200
        },
        unique_filename: true
      })

      fs.rmSync(image_path)
    }

    const updatedPublication = await prisma.publication.update({
      data: {
        subtitle: subtitle ? subtitle : null,
        image_public_id: uploadedImage ? uploadedImage.public_id : null,
        image_url: uploadedImage ? uploadedImage.url : null
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
        created_at: true,
        id: true,
        subtitle: true,
        image_url: true,
        image_public_id: true
      },
      where: { id }
    })

    return updatedPublication
  }
}

export default new UpdatePublicationService()
