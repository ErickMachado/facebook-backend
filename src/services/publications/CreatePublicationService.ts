import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { prisma } from '@/prisma'
import { APIError } from '@/errors/APIError'

interface IPublicationPayload {
  subtitle?: string
  image_path?: string
  profile_id: string
}

class CreatePublicationService {
  public async execute({
    subtitle,
    image_path,
    profile_id
  }: IPublicationPayload) {
    if (!subtitle && !image_path) {
      throw new APIError(
        'At last 1 param should be passed to create a publication'
      )
    }

    if (!image_path) {
      const publication = await prisma.publication.create({
        data: {
          subtitle,
          author_id: profile_id
        }
      })

      return publication
    }

    const { public_id, url } = await cloudinary.uploader.upload(image_path, {
      folder: process.env.CLOUDINARY_POSTS_FOLDER,
      transformation: {
        height: 630,
        width: 1200
      },
      unique_filename: true
    })

    const publication = await prisma.publication.create({
      data: {
        author_id: profile_id,
        image_url: url,
        image_public_id: public_id,
        subtitle
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
        image_url: true,
        image_public_id: true,
        subtitle: true
      }
    })

    fs.rmSync(image_path)

    return publication
  }
}

export default new CreatePublicationService()
