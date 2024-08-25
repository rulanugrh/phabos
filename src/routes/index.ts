import { Application, Router } from "express";
import { routerAuth } from "./auth";

const routes: Array<[string, Router]> = [
    ["auth", routerAuth],
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