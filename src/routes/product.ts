import express, { Router } from "express";
import { handlerProductCount, handlerProductDelete, handlerProductGetAll, handlerProductGetByID, handlerProductGetByName, handlerProductRegister, handlerProductUpdate } from "../handler/product";

export const routerProduct: Router = express.Router()
routerProduct.post('/register', handlerProductRegister)
routerProduct.put('/update/:id', handlerProductUpdate)
routerProduct.delete('/delete/:id', handlerProductDelete)
routerProduct.get('/', handlerProductGetAll)
routerProduct.get('/find/:id', handlerProductGetByID)
routerProduct.get('/get', handlerProductGetByName)
routerProduct.get('/count', handlerProductCount)