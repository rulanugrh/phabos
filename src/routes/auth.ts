import express, { Router } from "express";
import { handlerGetMe, handlerUserCount, handlerUserLogin, handlerUserRegister, handlerUserUpdatePassword } from "../handler/user";
import { siteAdmin, verify } from "../middleware/verify";
import { validate } from "../middleware/validation";
import { schemaUserLogin, schemaUserRegister } from "../typed/schema";

export const routerAuth: Router = express.Router()
routerAuth.post("/register", validate(schemaUserRegister), handlerUserRegister)
routerAuth.post("/login", validate(schemaUserLogin), handlerUserLogin)
routerAuth.get("/getme", verify, handlerGetMe)
routerAuth.get('/count', siteAdmin, handlerUserCount)
routerAuth.put('/update/password', verify, handlerUserUpdatePassword)