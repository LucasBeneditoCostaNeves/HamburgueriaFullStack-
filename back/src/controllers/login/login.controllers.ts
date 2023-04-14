import { Request, Response } from "express";
import { createLoginServer } from "../../services/login/login.service";

export async function loginController(req:Request,res:Response){
    const returning = await createLoginServer(req)
    return res.json({
        token:returning
    })
}