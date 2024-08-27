import express, { Router } from "express";
import { handlerListOrderByUid, handlerOrderCancel, handlerOrderCountingPemasukanHariIni, handlerOrderCountingPemasukanTotal, handlerOrderGetAllForAdmin, handlerOrderRegister, handlerOrderUpdateAccept } from "../handler/order";
import { siteAdmin, verify } from "../middleware/verify";
import { validate } from "../middleware/validation";
import { schemaOrderRegister } from "../typed/schema";

export const routerOrder: Router = express.Router()
routerOrder.post('/register', validate(schemaOrderRegister), verify, handlerOrderRegister)
routerOrder.get('/history', verify, handlerListOrderByUid)
routerOrder.get('/income/total', siteAdmin, handlerOrderCountingPemasukanTotal)
routerOrder.get('/income/today', siteAdmin, handlerOrderCountingPemasukanHariIni)
routerOrder.delete('/cancel/:id', verify, handlerOrderCancel)
routerOrder.get('/admin/get', siteAdmin, handlerOrderGetAllForAdmin)
routerOrder.put('/update/status/:id', siteAdmin, handlerOrderUpdateAccept)