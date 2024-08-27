import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string

    if (token === null) {
        return res.status(401).json({
            msg: 'sorry you must login first'
        })
    }

    jwt.verify(token, process.env.APP_SECRET as string, (err: any, email: any) => {
        if (err instanceof JsonWebTokenError) {
            return res.status(400).json({
                message: err.message,
                code: 400,
            })
        }

        if ( err instanceof TokenExpiredError) {
            res.status(400).json({
                message: err.message,
            })
        }

        req.body.email = email
        next()
    })
}

export const siteAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string

    if (token === null) {
        return res.status(401).json({
            msg: 'sorry you must login first'
        })
    }

    const { role, email } = jwt.verify(token, process.env.APP_SECRET as string) as {
        role: string
        email: string
    }

    if (role !== process.env.ADMIN_ROLE && email !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({
            code: 403,
            msg: 'this page forbidden, youre role not support'
        })
    }
    
    jwt.verify(token, process.env.APP_SECRET as string, (err: any, email: any) => {
        if (err instanceof JsonWebTokenError) {
            return res.status(400).json({
                message: err.message,
                code: 400,
            })
        }

        if ( err instanceof TokenExpiredError) {
            res.status(400).json({
                message: err.message,
            })
        }

        req.body.email = email
        next()
    })
}