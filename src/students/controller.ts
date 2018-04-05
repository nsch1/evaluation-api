import {
  BadRequestError, Body, Delete, Get, HttpCode, JsonController, NotFoundError, Param, Patch,
  Post
} from "routing-controllers";
import Student from "./entity";
import Group from "../groups/entity";

@JsonController()
export default class StudentController {

  @Post('/classes/:id([0-9]+)/students')
  @HttpCode(201)
  async createStudent(
    @Body() body: Student,
    @Param('id') groupId: number
  ) {
    const group = await Group.findOne({where: {id: groupId}})
    if(!group) throw new BadRequestError("Class doesn't exist.")

    const student = await Student.create({
      ...body,
      group
    }).save()

    return Student.findOne({where: {id: student.id}, relations: ['evaluations']})
  }

  @Get('/students/:id([0-9]+)')
  async getStudent(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOne({where: {id:studentId}, relations: ['evaluations']})
    if(!student) throw new NotFoundError('No student found.')

    student.evaluations.sort((a, b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date))
    })

    return student
  }

  @Patch('/students/:id([0-9]+)')
  async updateStudent(
    @Body() update: Partial<Student>,
    @Param('id') studentId: number
  ) {
    const student = await Student.findOne({where: {id: studentId}})
    if(!student) throw new NotFoundError('No student found.')

    if(update.name) student.name = update.name
    if(update.picture) student.picture = update.picture

    await student.save()

    return student
  }

  @Delete('/students/:id([0-9]+)')
  async deleteStudent(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOne({where: {id: studentId}})
    if(!student) throw new NotFoundError('No student found.')

    return student.remove()
  }

}