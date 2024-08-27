import express, { Router } from "express";
import { handlerGetMe, handlerUserCount, handlerUserLogin, handlerUserRegister } from "../handler/user";
import { siteAdmin, verify } from "../middleware/verify";

export const routerAuth: Router = express.Router()
routerAuth.post("/register", handlerUserRegister)
routerAuth.post("/login", handlerUserLogin)
routerAuth.get("/getme", verify, handlerGetMe)
routerAuth.get('/count', siteAdmin, handlerUserCount)