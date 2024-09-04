import express, { Router } from "express";
import { homeHandler } from "../handler/user";

export const routerHome: Router = express.Router()
routerHome.get('/', homeHandler)