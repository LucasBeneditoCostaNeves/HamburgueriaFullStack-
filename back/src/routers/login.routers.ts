import { Router } from "express";
import { loginController } from "../controllers/login/login.controllers";

export const routerLogin :Router = Router()
routerLogin.post("",loginController)