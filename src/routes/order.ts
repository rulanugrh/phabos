import express, { Router } from "express";
import { handlerListOrderByUid, handlerOrderCountingPemasukanHariIni, handlerOrderCountingPemasukanTotal, handlerOrderRegister } from "../handler/order";

export const routerOrder: Router = express.Router()
routerOrder.post('/register', handlerOrderRegister)
routerOrder.get('/history', handlerListOrderByUid)
routerOrder.get('/pemasukan/total', handlerOrderCountingPemasukanTotal)
routerOrder.get('/pemasukan/today', handlerOrderCountingPemasukanHariIni)