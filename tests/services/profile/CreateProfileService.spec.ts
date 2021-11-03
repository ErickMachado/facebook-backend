import faker from 'faker'
import supertest from 'supertest'
import { server } from '../../../src/server'

interface ICreatePayload {
  email?: string
  name?: string
  password?: string
  redirectLink?: string
  username?: string
}

describe('CreateProfileService.ts', () => {
  let requestMock: ICreatePayload

  beforeEach(() => {
    requestMock = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: faker.internet.password(),
      redirectLink: faker.internet.url(),
      username: faker.internet.userName()
    }
  })

  it('Should return an error if email is missing in request', async () => {
    delete requestMock.email

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual('Missing param: email')
  })

  it('Should return an error if invalid email is provided', async () => {
    requestMock.email = 'mock@'

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual('Invalid param: email')
  })

  it('Should return an error if name is missing in request', async () => {
    delete requestMock.name

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual('Missing param: name')
  })

  it('Should return an error if username is missing in request', async () => {
    delete requestMock.username

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual('Missing param: username')
  })

  it('Should return an error if password is missing in request', async () => {
    delete requestMock.password

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual('Missing param: password')
  })

  it('Should return an error if redirect link is missing in request', async () => {
    delete requestMock.redirectLink

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual(
      'Missing param: redirectLink'
    )
  })

  it('Should return an error if password length is less than 8', async () => {
    requestMock.password = '1234'

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual(
      'Password should have at last 8 characters'
    )
  })

  it('Should return an error if email is already in use', async () => {
    requestMock.email = 'test@gmail.com'

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.text).error).toEqual('User already registered')
  })

  it('Should return an error if username is already in use', async () => {
    requestMock.username = 'user.test'

    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.text).error).toEqual('Username already in use')
  })

  it('Should create a new profile', async () => {
    const response = await supertest(server).post('/profiles').send(requestMock)

    expect(response.statusCode).toEqual(201)
  })
})
