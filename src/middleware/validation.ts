import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validate(schema: z.ZodObject<any, any>)  {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if ( error instanceof ZodError) {
                const msg = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`
                }));

                return res.status(400).json({
                    code: 400,
                    msg: msg
                })
            } else {
                return res.status(500).json({
                    code: 500,
                    msg: String(error)
                })
            }
        }
    }
}