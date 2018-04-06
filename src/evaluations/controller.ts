import {
  Authorized, BadRequestError, Body, CurrentUser, HttpCode, JsonController, NotFoundError, Param,
  Post
} from "routing-controllers";
import Evaluation from "./entity";
import Student from "../students/entity";
import Teacher from "../users/entity";

@JsonController()
export default class EvaluationController{

  @Authorized()
  @Post('/students/:id([0-9]+)/evaluations')
  @HttpCode(201)
  async createEvaluation(
    @Body() body: Evaluation,
    @Param('id') studentId: number,
    @CurrentUser() teacher: Teacher
  ) {
    const student = await Student.findOne({where: {id: studentId}, relations: ['evaluations']})
    if(!student) throw new NotFoundError('No student found.')

    const newDate = new Date(body.date)
    if(newDate > new Date()) throw new BadRequestError("Evaluation can't be in the future.")

    const dateStrings = student.evaluations.map(e => new Date(e.date).toISOString())
    const newDateString = new Date(body.date.split('T')[0]).toISOString()

    if(dateStrings.indexOf(newDateString) !== -1) {
      throw new BadRequestError('There is already an evaluation for that date.')
    }

    const evaluation = await Evaluation.create({
      ...body,
      student,
      teacher
    }).save()

    return Evaluation.findOne({where: {id: evaluation.id}})
  }

}