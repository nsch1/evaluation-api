import {Body, HttpCode, JsonController, Post} from "routing-controllers";
import Group from "./entity";

@JsonController()
export default class GroupController {

  @Post('/classes')
  @HttpCode(201)
  createGroup(
    @Body() body: Group
  ) {
    return Group.create(body).save()
  }

}