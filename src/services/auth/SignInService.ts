import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/prisma'
import { APIError } from '@/errors/APIError'

interface ISignInPayload {
  readonly email: string
  readonly password: string
}

class SignInService {
  private readonly jwtSecret = process.env.JWT_SECRET as string

  public async execute({ email, password }: ISignInPayload) {
    if (!email) throw new APIError('Missing param: email')
    if (!password) throw new APIError('Missing param: password')

    const profileExists = await prisma.profile.findFirst({ where: { email } })

    if (!profileExists) throw new APIError('Incorrect email or password', 401)

    const isPasswordCorrect = await bcrypt.compare(
      password,
      profileExists.password
    )

    if (!isPasswordCorrect)
      throw new APIError('Incorrect email or password', 401)

    const profileWithoutPassword = await prisma.profile.findFirst({
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
      where: { email }
    })

    const token = jwt.sign({ profileWithoutPassword }, this.jwtSecret, {
      expiresIn: '1d',
      subject: profileWithoutPassword!.id
    })

    return { token, ...profileWithoutPassword }
  }
}

export default new SignInService()
