import { Router } from "express";
import { addRequestController } from "../controllers/request/request.controllers"
import { verifyTokenExist } from "../middlewares/verifyToken.middlewares"
import { readRequestUser } from "../services/requests/readRequestUser.service"
import { deleteRequestFull } from "../services/requests/deleteRequestFull.service"
import { addRequestService } from "../services/requests/addRequestUser.service"
import { deleteRequestUserPartial } from "../services/requests/deleteRequestPartial.service"

export const routerRequest :Router = Router()
routerRequest.post("",verifyTokenExist,addRequestController)
routerRequest.get("",verifyTokenExist,readRequestUser)
routerRequest.delete("",verifyTokenExist,deleteRequestFull)
routerRequest.post("/user",verifyTokenExist,addRequestService)
routerRequest.delete("/user",verifyTokenExist,deleteRequestUserPartial)