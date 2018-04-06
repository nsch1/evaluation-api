import {
  Authorized, BadRequestError, Body, Get, HttpCode, JsonController, NotFoundError, Param,
  Post
} from "routing-controllers";
import Group from "./entity";
import {getRepository} from "typeorm";

@JsonController()
export default class GroupController {

  @Authorized()
  @Get('/classes')
  async getGroups() {
    return Group.find({order: {id: 'ASC'}, relations: ['students']})
  }

  @Authorized()
  @Get('/classes/:id([0-9]+)')
  async getGroup(
    @Param('id') groupId: number
  ) {
    const group = await getRepository(Group)
      .createQueryBuilder('g')
      .where('g.id = :id', {id: groupId})
      .leftJoinAndSelect('g.students', 's')
      .leftJoinAndSelect('s.evaluations', 'e')
      .getOne()

    if(!group) throw new NotFoundError('No class found.')

    if(group.students[1]) {
      group.students.sort((a, b) => a.id! - b.id!)
    }

    group.students.forEach(s => {
      s.evaluations.sort((a, b) => {
        return Number(new Date(b.date)) - Number(new Date(a.date))
      })
    })

    return group

  }

  @Authorized()
  @Post('/classes')
  @HttpCode(201)
  async createGroup(
    @Body() body: Group
  ) {
    const group = await Group.findOne({where: {id: body.id}})
    if(group) throw new BadRequestError('Class with that number already exists.')

    await Group.create(body).save()
    return Group.findOne({where: {id: body.id}, relations: ['students']})
  }

}