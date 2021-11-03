import supertest from 'supertest'
import { server } from '../../../src/server'

interface ISignInPayload {
  email?: string
  password?: string
}

describe('Sign in creation service', () => {
  let credentials: ISignInPayload

  beforeEach(() => {
    credentials = {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD
    }
  })

  it('Should return an error if invalid email is provided', async () => {
    delete credentials.email

    const { statusCode, text } = await supertest(server)
      .post('/auth')
      .send(credentials)

    expect(statusCode).toEqual(400)
    expect(JSON.parse(text).error).toEqual('Missing param: email')
  })

  it('Should return an error if password is not provided', async () => {
    delete credentials.password

    const { statusCode, text } = await supertest(server)
      .post('/auth')
      .send(credentials)

    expect(statusCode).toEqual(400)
    expect(JSON.parse(text).error).toEqual('Missing param: password')
  })

  it('Should return an error if email is incorrect', async () => {
    credentials.email = 'test.incorrect@gmail.com'

    const { statusCode, text } = await supertest(server)
      .post('/auth')
      .send(credentials)

    expect(statusCode).toEqual(401)
    expect(JSON.parse(text).error).toEqual('Incorrect email or password')
  })

  it('Should return an error if password is incorrect', async () => {
    credentials.password = '123'

    const { statusCode, text } = await supertest(server)
      .post('/auth')
      .send(credentials)

    expect(statusCode).toEqual(401)
    expect(JSON.parse(text).error).toEqual('Incorrect email or password')
  })

  it('Should return jwt token and the user info on login', async () => {
    const response = await supertest(server).post('/auth').send(credentials)

    expect(response.statusCode).toEqual(200)
  })
})
