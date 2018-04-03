import {BadRequestError, Body, JsonController, Post} from "routing-controllers";
import {IsEmail, IsString} from "class-validator";
import User from "../users/entity";

class AuthenticatePayload {

  @IsEmail()
  email: string

  @IsString()
  password: string

}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() {email, password}: AuthenticatePayload
  ) {
    const user = await User.findOne({where: {email}})
    if(!user) throw new BadRequestError('No user with that email found.')

    if(!await user.checkPassword(password)) throw new BadRequestError('Incorrect password.')
  }

}