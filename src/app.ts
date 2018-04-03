import 'reflect-metadata'
import LoginController from "./logins/controller";
import {createKoaServer} from "routing-controllers";

export default createKoaServer({
  controllers: [
    LoginController
  ]
})