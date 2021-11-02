import bcrypt from 'bcrypt'
import ejs from 'ejs'
import nodemailer from 'nodemailer'
import path from 'path'
import { prisma } from '@/prisma'
import { APIError } from '@/errors/APIError'

interface ICreatePayload {
  readonly bio?: string
  readonly city?: string
  readonly email: string
  readonly name: string
  readonly password: string
  readonly username: string
}

class CreateProfileService {
  private readonly requiredParams = ['email', 'name', 'password', 'username']
  private emailTemplate = path.resolve(
    __dirname,
    '..',
    '..',
    'email',
    'welcome.ejs'
  )
  private readonly mailTransporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  public async execute(profile: ICreatePayload, redirectLink: string) {
    for (const param of this.requiredParams) {
      if (!profile[param as keyof ICreatePayload]) {
        throw new APIError(`Missing param: ${param}`)
      }
    }

    if (!redirectLink) throw new APIError('Missing param: redirectLink')

    const emailAlreadyExists = await prisma.profile.findFirst({
      where: { email: profile.email }
    })

    if (emailAlreadyExists) {
      throw new APIError('User already registered')
    }

    const usernameAlreadyExists = await prisma.profile.findFirst({
      where: { username: profile.username }
    })

    if (usernameAlreadyExists) {
      throw new APIError('Username already in use')
    }

    const hashedPassword = await bcrypt.hash(profile.password, 3)

    try {
      const { id } = await prisma.profile.create({
        data: {
          email: profile.email,
          name: profile.name,
          username: profile.username,
          password: hashedPassword
        }
      })

      const welcomeEmail = await ejs.renderFile(this.emailTemplate, {
        redirectLink: `${redirectLink}/${id}`
      })

      await this.mailTransporter.sendMail({
        from: 'equipe@facebook.com',
        html: welcomeEmail,
        to: profile.email,
        subject: 'Bem-vindo ao Facebook'
      })
    } catch (_) {
      throw new Error()
    }

    return true
  }
}

export default new CreateProfileService()
