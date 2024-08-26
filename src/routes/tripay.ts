import express, { Router } from "express";
import { callbackTripay } from "../handler/tripay";

export const routerTripay: Router = express.Router()
routerTripay.post("/callback", callbackTripay)