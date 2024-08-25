import jsonwebtoken, {JsonWebTokenError} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export type PayloadToken = {
    id: string,
    email: string,
    name: string,
    role: string,
}
export const generateToken = (payload: PayloadToken): string => {
    return jsonwebtoken.sign({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
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