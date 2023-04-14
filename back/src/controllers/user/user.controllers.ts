import { Request, Response } from "express"
import { getUser } from "../../services/users/getUser.service"
import { createUser } from "../../services/users/createdUser.service"

export async function readUsersControllers(req:Request,res:Response){
    //Chamando nossa função service responsável pela lógica
const retornoDaFuncao = await getUser(req,res)
    //Retornando o objeto retornando pelo service
return res.status(200).send(retornoDaFuncao)
}

export async function createdUserControllers(req:Request, res:Response){
    const retornoDaFuncao = await createUser(req,res)
    return res.status(201).send(retornoDaFuncao)
}
