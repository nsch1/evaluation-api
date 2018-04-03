import 'jest'
import * as request from 'supertest'
import app from '../app'
import setupDb from '../db'
import User from "../users/entity";

const email = 'test@example.com'
const password = 'test1234'

beforeAll(async () => {
  await setupDb(false)
  const entity = User.create({email})
  await entity.setPassword(password)
  await entity.save()
})

afterAll(async () => {
  const testUser = await User.findOne({where: {email}})
  if(!testUser) return
  await testUser.remove()
})

describe('LoginController', () => {
  test('/logins', async () => {
    await request(await app.callback())
      .post('/logins')
      .send({
        email,
        password
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.jwt).not.toBe(undefined)
      })
  })
})