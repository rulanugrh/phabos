import express, { Router } from "express";
import { handlerListOrderByUid, handlerOrderCancel, handlerOrderCountingPemasukanHariIni, handlerOrderCountingPemasukanTotal, handlerOrderRegister } from "../handler/order";
import { siteAdmin, verify } from "../middleware/verify";

export const routerOrder: Router = express.Router()
routerOrder.post('/register', verify, handlerOrderRegister)
routerOrder.get('/history', verify, handlerListOrderByUid)
routerOrder.get('/pemasukan/total', siteAdmin, handlerOrderCountingPemasukanTotal)
routerOrder.get('/pemasukan/today', siteAdmin, handlerOrderCountingPemasukanHariIni)
routerOrder.delete('/cancel/:id', verify, handlerOrderCancel)