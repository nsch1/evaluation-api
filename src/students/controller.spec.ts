import 'jest'
import * as request from 'supertest'
import app from '../app'
import setupDb from '../db'
import Student from "./entity";

const name = 'Test Guy'
const picture = 'http://example.com/picture.png'

beforeAll(async () => {
  await setupDb(false)
})

describe('StudentController', () => {
  test('/classes/:id/students', async () => {
    await request(await app.callback())
      .post('/classes/1/students')
      .send({
        name,
        picture
      })
      .expect(201)
      .then(res => {
        const {body} = res
        expect(body.id).not.toBe(undefined)
        expect(body.name).toBe(name)
        expect(body.picture).toBe(picture)
      })
    const student = await Student.findOne({where: {name}})
    expect(student).not.toBe(undefined)
  })

  afterAll(async () => {
    const testStudent = await Student.findOne({where: {name}})
    if(testStudent) await testStudent.remove()
  })
})