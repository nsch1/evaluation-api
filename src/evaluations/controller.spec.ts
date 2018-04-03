import 'jest'
import * as request from 'supertest'
import app from '../app'
import setupDb from '../db'
import Evaluation from "./entity";

const color = 'red'
const remark = 'test remark'
const date = new Date()

let jwt

beforeAll(async () => {
  await setupDb(false)
  jwt = await request(await app.callback())
    .post('/logins')
    .send({email: 'test1@example.com', password: 'test1234'})
    .then(res => res.body.jwt)
})

describe('EvaluationController', () => {
  test('/students/:id/evaluations', async () => {
    await request(await app.callback())
      .post('/students/6/evaluations')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        color,
        remark,
        date
      })
      .expect(201)
      .then(res => {
        const {body} = res
        expect(body.id).not.toBe(undefined)
      })
      .catch(err => console.log(err))
    const evaluation = await Evaluation.findOne({where: {remark}})
    expect(evaluation).not.toBe(undefined)
  })

  afterAll(async () => {
    const testEvaluation = await Evaluation.findOne({where: {remark}})
    if(testEvaluation) await testEvaluation.remove()
  })
})