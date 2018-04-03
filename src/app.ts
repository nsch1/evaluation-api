import 'reflect-metadata'
import LoginController from "./logins/controller";
import {createKoaServer} from "routing-controllers";
import GroupController from "./groups/controller";

export default createKoaServer({
  controllers: [
    LoginController,
    GroupController
  ]
})