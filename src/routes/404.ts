import { Request, Response, Router } from "express";

export const NotFound: Router = Router()
NotFound.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        error: `Route: ${req.originalUrl} not found`
    })
})