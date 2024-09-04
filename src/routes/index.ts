import { Application, Router } from "express";
import { routerAuth } from "./auth";
import { routerProduct } from "./product";
import { routerOrder } from "./order";
import { routerTripay } from "./tripay";
import { routerTopup } from "./topup";
import { routerHome } from "./home";

const routes: Array<[string, Router]> = [
    ["auth", routerAuth],
    ["product", routerProduct],
    ["order", routerOrder],
    ["tripay", routerTripay],
    ["topup", routerTopup],
    ["home", routerHome]
]

export const Routes = (app: Application) => {
    routes.forEach((route) => {
        const [url, router] = route
        if (url !== "*") {
            app.use(`/api/${url}`, router)
        } else {
            app.use(url, router)
        }
    })
}