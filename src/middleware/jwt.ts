import jsonwebtoken, {JsonWebTokenError} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export type PayloadToken = {
    id: string,
    email: string,
    name: string,
}
export const generateToken = (payload: PayloadToken): string => {
    return jsonwebtoken.sign({
        id: payload.id,
        name: payload.name,
        email: payload.email,
    }, process.env.APP_SECRET as string, {
        expiresIn: '1h',
        algorithm: 'HS256'
    })
}

export const readEmail = (token: string): string => {
    try {
        const { email } = jsonwebtoken.verify(token, process.env.APP_SECRET as string) as {
            email: string
        }

        return email
    } catch (error) {
        if ( error instanceof JsonWebTokenError ) {
            throw new Error(error.message)
        } else {
            throw new Error('Internal server Error')
        }
    }
}

export const readID = (token: string): string => {
    try {
        const { id } = jsonwebtoken.verify(token, process.env.APP_SECRET as string) as {
            id: string
        }

        return id
    } catch (error) {
        if ( error instanceof JsonWebTokenError ) {
            throw new Error(error.message)
        } else {
            throw new Error('Internal server Error')
        }
    }
}
