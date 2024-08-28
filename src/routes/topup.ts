import express, { Router } from "express";
import { handlerTopupRegister, handlerTopUpHistory, handlerTopUpGetByID, handlerTopUpGetForAdmin } from '../handler/topup';
import { siteAdmin, verify } from "../middleware/verify";
import { validate } from "../middleware/validation";
import { schemaTopUp } from "../typed/schema";

export const routerTopup: Router = express.Router()
routerTopup.post('/register', validate(schemaTopUp), verify, handlerTopupRegister)
routerTopup.get('/history', verify, handlerTopUpHistory)
routerTopup.get('/find/:id', verify, handlerTopUpGetByID)
routerTopup.get('/admin/get', siteAdmin, handlerTopUpGetForAdmin)