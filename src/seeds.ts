import Teacher from "./users/entity"
import setupDb from './db'
import Group from "./groups/entity";
import Student from "./students/entity";
import Evaluation from "./evaluations/entity";

const seedUser = async (n: number) => {
  const entity = Teacher.create({
    email: `test${n}@example.com`
  })

  await entity.setPassword('test1234')
  await entity.save()
}

const seedGroup = async (id: number) => {
  const startDate = new Date('2018-04-16')
  const endDate = new Date('2018-05-22')

  await Group.create({id, startDate, endDate}).save()
}

const seedStudents = (group: Group) => {
  const students: Promise<Student>[] = []
  for (let i=0; i < 6; i++) {
    students.push(Student.create({
      name: `Test ${i}`,
      picture: `http://example.com/picture${i}.png`,
      group
    }).save())
  }
  return students
}

const seedEvaluations = (student: Student, teacher: Teacher) => {
  const colors = ['red', 'yellow', 'green']
  const evaluations: Promise<Evaluation>[] = []
  for (let i=0; i < 6; i++) {
    evaluations.push(Evaluation.create({
      color: colors[Math.floor(Math.random() * 3)],
      date: new Date(`2018-12-${Math.floor(Math.random() * 31) + 1}`),
      remark: 'lol',
      student,
      teacher
    }).save())
  }
  return evaluations
}

const runSeeds = async () => {
  for(let i=1; i < 6; i++) {
    await seedUser(i)
    await seedGroup(i)
  }
  const groups = await Group.find()
  await Promise.all(groups.map(g => Promise.all(seedStudents(g))))
  const students = await Student.find()
  const teacher = await Teacher.findOneById(1)
  if(teacher) await Promise.all(students.map(s => Promise.all(seedEvaluations(s, teacher))))
}

setupDb(true)
  .then(async () => {
    try {
      await runSeeds()
      console.log('Seeds ran successfully')
      process.exit()
    } catch (err) {
      console.log('Something went wrong: ' + err.message)
      process.exit(1)
    }
  })