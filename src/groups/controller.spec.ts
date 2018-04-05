import 'jest'
import * as request from 'supertest'
import app from '../app'
import setupDb from '../db'
import Group from "./entity";
import Student from "../students/entity";

beforeAll(async () => {
  await setupDb(false)
})

const id = 15
const startDate = new Date('2018-04-16')
const endDate = new Date('2018-05-22')

describe('GroupController', () => {
  test('POST /classes', async () => {
    await request(await app.callback())
      .post('/classes')
      .send({
        id,
        startDate,
        endDate
      })
      .expect(201)
      .then(res => {
        const {body} = res
        expect(body.id).toBe(id)
        expect(body.startDate).toBe(startDate.toISOString())
        expect(body.endDate).toBe(endDate.toISOString())
      })
      .catch(err => console.log(err.message))
    const group = await Group.findOneById(id)
    expect(group).not.toBe(undefined)
  })

  test('GET /classes', async () => {
    await request(await app.callback())
      .get('/classes')
      .expect(200)
      .then(res => {
        const {body} = res
        expect(body).not.toBe(undefined)
      })
  })

  test('GET /classes/:id', async () => {
    const student = await Student.findOne({where: {group_id: 1}, relations: ['evaluations']})

    student!.evaluations.sort((a,b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date))
    })

    await request(await app.callback())
      .get('/classes/1')
      .expect(200)
      .then(res => {
        const {body} = res
        expect(body.id).toBe(1)
        expect(body.students).toEqual(expect.arrayContaining([student]))
      })
  })

  afterAll(async () => {
    const testGroup = await Group.findOneById(id)
    if(testGroup) await testGroup.remove()
  })
})