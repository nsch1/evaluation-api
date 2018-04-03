import 'reflect-metadata'
import {createKoaServer} from "routing-controllers";
import LoginController from "./logins/controller";
import GroupController from "./groups/controller";
import StudentController from "./students/controller";

export default createKoaServer({
  controllers: [
    LoginController,
    GroupController,
    StudentController
  ]
})