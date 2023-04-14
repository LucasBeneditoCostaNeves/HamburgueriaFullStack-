import * as express from 'express'

//mudar chaves
declare global {
    namespace Express {
        interface Request {
            user: {
                id: number
                admin: boolean
            }
        }
    }
}