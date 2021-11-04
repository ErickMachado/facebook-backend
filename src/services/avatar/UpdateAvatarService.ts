import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { prisma } from '@/prisma'
import { APIError } from '@/errors/APIError'

interface IAvatarPayload {
  image_path: string
  profile_id: string
}

class UpdateAvatarService {
  async execute({ image_path, profile_id }: IAvatarPayload) {
    const profileExists = await prisma.profile.findFirst({
      where: {
        id: profile_id
      }
    })

    if (!profileExists) throw new APIError('Profile not found', 404)

    const avatar = await prisma.avatar.findFirst({ where: { profile_id } })

    if (avatar) {
      await cloudinary.uploader.destroy(avatar.public_id)

      const { public_id, url } = await cloudinary.uploader.upload(image_path, {
        folder: process.env.CLOUDINARY_AVATAR_FOLDER,
        transformation: {
          height: 200,
          quality: 80,
          width: 200
        },
        unique_filename: true
      })

      await prisma.avatar.update({
        data: {
          public_id,
          url
        },
        where: { profile_id }
      })

      fs.rmSync(image_path)

      return url
    }

    const { public_id, url } = await cloudinary.uploader.upload(image_path, {
      folder: 'Facebook/Avatars',
      transformation: {
        height: 200,
        quality: 80,
        width: 200
      },
      unique_filename: true
    })

    await prisma.avatar.create({
      data: {
        profile_id,
        public_id,
        url
      }
    })

    fs.rmSync(image_path)

    return url
  }
}

export default new UpdateAvatarService()
