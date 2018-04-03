import {BadRequestError, Body, CurrentUser, JsonController, Param, Post} from "routing-controllers";
import Evaluation from "./entity";
import Student from "../students/entity";
import Teacher from "../users/entity";

@JsonController()
export default class EvaluationController{

  @Post('students/:id([0-9]+)/evaluations')
  async createEvaluation(
    @Body() body: Evaluation,
    @Param('id') studentId: number,
    @CurrentUser() teacher: Teacher
  ) {
    const student = await Student.findOneById(studentId)
    if(!student) throw new BadRequestError('No student found.')

    return Evaluation.create({
      ...body,
      student,
      teacher
    })
  }

}