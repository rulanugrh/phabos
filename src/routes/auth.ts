import express, { Router } from "express";
import { handlerGetMe, handlerUserLogin, handlerUserRegister } from "../handler/users";

export const routerAuth: Router = express.Router()
routerAuth.post("/register", handlerUserRegister)
routerAuth.post("/login", handlerUserLogin)
routerAuth.get("/getme", handlerGetMe)