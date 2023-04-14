import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"

/*A classe AppError: uma classe que estende a classe Error e 
define uma mensagem de erro personalizada e um código de status HTTP. 
Quando essa classe é usada para criar um erro, o código que o utiliza 
pode tratar o erro de forma personalizada com base no código de status 
HTTP e na mensagem fornecidos.*/

export class AppError extends Error {
    message: string
    statusCode: number

    constructor(message:string, statusCode: number = 400){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

/*A função handleErrors verifica se o objeto Error é uma instância da 
classe AppError. Se for, a função retorna uma resposta HTTP com o 
código de status e a mensagem definidos na instância de AppError.
Caso contrário, a função verifica se o objeto Error é uma instância 
da classe ZodError. Se for, a função retorna uma resposta HTTP com 
um código de status 400 e a mensagem de erro definida pela classe 
ZodError. Se nenhum desses casos for atendido, a função retorna uma 
resposta HTTP com um código de status 500 e uma mensagem de erro padrão.*/

export const handleErrors = (error: Error, req:Request, res:Response,next:NextFunction) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            message: error.message,
        })
    }

    if(error instanceof ZodError){
        return res.status(400).json({
            message: error.flatten().fieldErrors,
        })
    }
    console.log(error)
    return res.status(500).json({
        message: 'Internal server error',
    })
    }