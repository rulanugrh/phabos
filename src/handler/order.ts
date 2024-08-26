import { Request, Response } from "express";
import { readID } from "../middleware/jwt";
import { OrderRequest } from "../typed/dto";
import { orderCountingPemasukanHariIni, orderCountingPemasukanTotal, orderList, orderRegister } from "../service/order";

export const handlerOrderRegister = async(req: Request, res: Response): Promise<Response> => {
    const { product_id, via, jumlah } = req.body
    const token = req.headers.authorization as string

    try {
        const user_id = readID(token)
        const request: OrderRequest = {
            user_id: user_id,
            product_id: product_id,
            via: via,
            jumlah: jumlah,
            status: "process"
        }

        const response = await orderRegister(request)
        return res.status(201).json({
            code: 201,
            msg: 'success create order',
            data: response
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerListOrderByUid = async(req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization as string
    try {
        const user_id = readID(token)
        const data = await orderList(user_id)
        if (data === null || data === undefined) {
            return res.status(404).json({
                code: 404,
                msg: 'data not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get all list order',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerOrderCountingPemasukanTotal = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await orderCountingPemasukanTotal()
        if (data === 0) {
            return res.status(200).json({
                code: 200,
                msg: 'maaf tidak ada pemasukan',
                data: 0
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get pemasukan',
            total_pemasukan: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerOrderCountingPemasukanHariIni = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await orderCountingPemasukanHariIni()
        if (data === 0) {
            return res.status(200).json({
                code: 200,
                msg: 'maaf tidak ada pemasukan hari ini',
                data: 0
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'total pemasukan hari ini',
            total_pemasukan: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}