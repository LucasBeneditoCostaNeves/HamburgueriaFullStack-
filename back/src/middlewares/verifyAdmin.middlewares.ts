import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export async function verifyIfAdmin(req:Request,res:Response,next:NextFunction){
    let token = req.headers.authorization

    if(!token){
        throw new AppError('Missing bearer token', 401) 
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {

        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: parseInt(decoded.sub),
            admin: decoded.admin,
        }
    })

    const verifyAdmin = req.user
    
    if(typeof verifyAdmin.id != "number"){
        throw new AppError('Insufficient permission', 403)
    }

    if(verifyAdmin.admin == false){
        throw new AppError('Insufficient permission', 403)
    }


    return next()
}   
