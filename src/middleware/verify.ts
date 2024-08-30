import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError} from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

export interface CustomRequest extends Request {
    token: string | JwtPayload
}
export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    try {    
        if (token === null) {
            return res.status(401).json({
                msg: 'sorry you must login first'
            })
        }
        
        const decoded = jwt.verify(token, process.env.APP_SECRET as string);
        (req as CustomRequest).token = decoded;
        next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) {

            if (err.message === "jwt malformed") {
                return res.status(403).json({
                    code: 403,
                    msg: 'Invalid Token, you are want to bypass this site?'
                })
            } else if (err.message === "invalid signature") {
                return res.status(403).json({
                    code: 403,
                    msg: 'invalid signature or secret token'
                })
            } else {
                return res.status(400).json({
                    code: 400,
                    msg: err.message
                })
            }
        }
        if ( err instanceof TokenExpiredError) {
            return res.status(400).json({
                code: 400,
                err: err.message
            })
        }

        return res.status(400).json({
            code: 400,
            msg: err
        })
    }
}

export const siteAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    try {
        if (token === null) {
            return res.status(401).json({
                msg: 'sorry you must login first'
            })
        }
    
        const { email } = jwt.verify(token, process.env.APP_SECRET as string) as {
            email: string
        }
    
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                code: 403,
                msg: 'this page forbidden, youre role not support'
            })
        }
        
        const decoded = jwt.verify(token, process.env.APP_SECRET as string);
        (req as CustomRequest).token = decoded;
        next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            if (err.message === "jwt malformed") {
                return res.status(403).json({
                    code: 403,
                    msg: 'Invalid Token, are you want to bypass this site?'
                })
            } else if (err.message === "invalid signature") {
                return res.status(403).json({
                    code: 403,
                    msg: 'invalid signature or secret token'
                })
            }  else {
                return res.status(400).json({
                    code: 400,
                    msg: err.message
                })
            }
        }

        if ( err instanceof TokenExpiredError) {
            return res.status(400).json({
                code: 400,
                err: err.message
            })
        }
        return res.status(400).json({
            code: 400,
            msg: err
        })
    }

}