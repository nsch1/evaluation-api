import 'reflect-metadata'
import {Action, createKoaServer} from "routing-controllers";
import LoginController from "./logins/controller";
import GroupController from "./groups/controller";
import StudentController from "./students/controller";
import {verify} from "./jwt";
import Teacher from "./users/entity";
import EvaluationController from "./evaluations/controller";

export default createKoaServer({
  controllers: [
    LoginController,
    GroupController,
    StudentController,
    EvaluationController
  ],
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      if (token) {
        const {id} = verify(token)
        return Teacher.findOneById(id)
      }
    }
    return undefined
  }
})