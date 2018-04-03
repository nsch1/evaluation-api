import {Body, Get, HttpCode, JsonController, Post} from "routing-controllers";
import Group from "./entity";

@JsonController()
export default class GroupController {

  @Get('/classes')
  getGroups() {
    return Group.find()
  }
  
  @Post('/classes')
  @HttpCode(201)
  createGroup(
    @Body() body: Group
  ) {
    return Group.create(body).save()
  }

}