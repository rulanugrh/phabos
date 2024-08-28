import { Request, Response } from "express"
import { TopUp } from "../typed/dto"
import { readEmail } from "../middleware/jwt"
import { topupDetail, topupGetAllByAdmin, topupHistory, topupRegister } from "../service/topup"
import { requestTransactionTopup } from "../util/tripay"


export const handlerTopupRegister = async(req: Request, res: Response): Promise<Response> => {
    const { via, balance } = req.body
    const token = req.headers.authorization as string
    try {
        const email = readEmail(token)
        const request: TopUp = {
            via: via,
            balance: balance,
            user_email: email
        }

        const data = await topupRegister(request)
        const { checkout_url, status } = await requestTransactionTopup(data, email)
        return res.status(201).json({
            code: 201,
            msg: 'success topup, go to pay it',
            data: {
                id: data.id,
                balance: data.balance,
                via: data.via,
                checkout_url: checkout_url,
                status: status
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerTopUpHistory = async(req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization as string
    try {
        const email = readEmail(token)
        const data = await topupHistory(email)
        if (data.length === 0 || !data) {
            return res.status(200).json({
                code: 200,
                msg: 'Maaf kamu belum melakukan topup sama sekali'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get all history topup',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerTopUpGetByID = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    try {
        const data = await topupDetail(id)
        if (data.via === undefined || data.via === null) {
            return res.status(404).json({
                code: 404,
                msg: 'sorry topup with this id not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get detail topup',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerTopUpGetForAdmin = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await topupGetAllByAdmin()
        if (data.length === 0 || !data) {
            return res.status(200).json({
                code: 200,
                msg: 'No one has done topups yet'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get all topup',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}