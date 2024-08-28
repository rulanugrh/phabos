import { Request, Response } from "express";
import { UserLogin, UserRegister } from "../typed/dto";
import { userCount, userGetMe, userLogin, userRegister, userUpdatePassword } from "../service/user";
import bcrypt from 'bcrypt';
import { generateToken, PayloadToken, readEmail } from "../middleware/jwt";

export const handlerUserRegister = async(req: Request, res: Response): Promise<Response> => {
    const { name, email, password, phone_number } = req.body
    try {
        const request: UserRegister = {
            name: name,
            email: email,
            password: password,
            phonenumber: phone_number
        }

        const response = await userRegister(request)
        return res.status(201).json({
            msg: 'success add user',
            code: 201,
            data: response
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerUserLogin = async(req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body
    try {
        const request: UserLogin = {
            email: email,
            password: password
        }

        const data = await userLogin(request)
        const verify = await bcrypt.compare(password, data.password)

        if (!verify) {
            return res.status(401).json({
                code: 401,
                msg: 'invalid password'
            })
        }

        let payload: PayloadToken = {
            id: data._id,
            name: data.name,
            email: data.email,
        }

        const token = generateToken(payload)
        return res.status(200).json({
            code: 200,
            msg: 'success login',
            data: {
                token: token,
                name: data.name
            }
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerGetMe = async(req: Request, res: Response): Promise<Response> => {
    try {
        const token = req.headers.authorization as string
        const email = readEmail(token)

        const data = await userGetMe(email)
        if (data._id === undefined) {
            return res.status(404).json({
                code: 404,
                msg: 'sorry your user not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get user',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerUserCount = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await userCount()
        return res.status(200).json({
            code: 200,
            msg: 'total user active',
            total_user: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerUserUpdatePassword = async(req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization as string
    const { password } = req.body
    try {
        const user_email = readEmail(token)
        const verify = await userUpdatePassword(user_email, password)
        if (!verify) {
            return res.status(404).json({
                code: 404,
                msg: 'sorry data with this email not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success update password'
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}