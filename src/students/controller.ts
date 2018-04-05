import {BadRequestError, Body, Get, HttpCode, JsonController, Param, Post} from "routing-controllers";
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
    const group = await Group.findOneById(groupId)
    if(!group) throw new BadRequestError("Class doesn't exist.")

    return Student.create({
      ...body,
      group
    }).save()
  }

  @Get('/students/:id([0-9]+)')
  getStudent(
    @Param('id') studentId: number
  ) {
    return Student.findOne({where: {id:studentId}, relations: ['evaluations']})
  }

}