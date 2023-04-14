import "express-async-errors"
import express, { Application } from "express"
import { handleErrors } from "./error"
import {routerUser} from "./routers/users.routers"
import { routerLogin } from "./routers/login.routers"
import { routerRequest } from "./routers/request.routers"

/*O express não vem com a leitura de dados JSON já habilitado então
fazemos essa função para habilitar a leitura de dados JSON
uma função middleware do Express.js que é usada para 
analisar corpos de solicitação no formato JSON. - MAIS EXPLICAÇÕES...*/ 

export const app:Application = express()

app.use(express.json())
app.use("/user",routerUser)
app.use("/login",routerLogin)
app.use("/request",routerRequest)
app.use(handleErrors)