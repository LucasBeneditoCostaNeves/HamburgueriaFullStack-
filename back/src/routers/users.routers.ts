import { Router } from "express" 
import {createdUserControllers, readUsersControllers} from "../controllers/user/user.controllers"
import { verifyIfAdmin } from "../middlewares/verifyAdmin.middlewares"
import { readData } from "../services/data/readData.service"

//aqui podemos criar nossas rotas e nossa chamada de função
export const routerUser: Router = Router()
//exemplo:

routerUser.get("",verifyIfAdmin,readUsersControllers)
routerUser.post("",createdUserControllers)
routerUser.get("/products",readData)
//routerGenerico.post("",FunçãoGenéricaDeMiddlewares,funçãoGenericaDeController)
//routerGenerico.delete("/:id",FunçãoGenéricaDeMiddlewares,funçãoGenericaDeController)