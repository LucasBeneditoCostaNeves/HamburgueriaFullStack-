import { Request, Response } from "express"
import { addRequestNoRepeatService } from "../../services/requests/addRequest.service"

export async function addRequestController(req:Request,res:Response){
    const returning = await addRequestNoRepeatService(req,res)
}