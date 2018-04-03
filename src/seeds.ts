import User from "./users/entity"
import setupDb from './db'

const seedUser = async (n: number) => {
  const entity = User.create({
    email: `test${n}@example.com`
  })

  await entity.setPassword('test1234')
  await entity.save()
}

const runSeeds = async () => {
  for(let i=0; i < 5; i++) {
    await seedUser(i)
  }
}

setupDb()
  .then(async _ => {
    await runSeeds()
  })