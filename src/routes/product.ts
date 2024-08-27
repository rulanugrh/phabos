import express, { Router } from "express";
import { handlerProductCount, handlerProductDelete, handlerProductGetAll, handlerProductGetByID, handlerProductGetByName, handlerProductRegister, handlerProductUpdate } from "../handler/product";
import { siteAdmin, verify } from "../middleware/verify";
import { validate } from "../middleware/validation";
import { schemaProductRegister } from "../typed/schema";

export const routerProduct: Router = express.Router()
routerProduct.post('/register', validate(schemaProductRegister), siteAdmin, handlerProductRegister)
routerProduct.put('/update/:id', siteAdmin, handlerProductUpdate)
routerProduct.delete('/delete/:id', siteAdmin, handlerProductDelete)
routerProduct.get('/', verify, handlerProductGetAll)
routerProduct.get('/find/:id', verify, handlerProductGetByID)
routerProduct.get('/get', verify, handlerProductGetByName)
routerProduct.get('/count', siteAdmin, handlerProductCount)