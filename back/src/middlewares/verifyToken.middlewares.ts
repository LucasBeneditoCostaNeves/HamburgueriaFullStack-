import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export async function verifyTokenExist(req:any,res:Response,next:NextFunction){
    let token = req.headers.authorization

    if(!token){
        throw new AppError('Missing bearer token', 401) 
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error:any, decoded: any) => {

        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: parseInt(decoded.sub),
            admin: decoded.admin,
        }

        return next()
    })
}