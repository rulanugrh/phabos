import { Request, Response } from "express";
import { readEmail, readID } from "../middleware/jwt";
import { OrderRequest } from "../typed/dto";
import { orderCancel, orderCountingPemasukanHariIni, orderCountingPemasukanTotal, orderList, orderRegister, orderWithAmount } from "../service/order";
import { requestTransaction } from "../util/tripay";
import { checkUserBalance } from "../service/user";
import { productStock } from "../service/product";

export const handlerOrderRegister = async(req: Request, res: Response): Promise<Response> => {
    const { product_id, via, jumlah } = req.body
    const token = req.headers.authorization as string

    try {
        const user_id = readID(token)
        const user_email = readEmail(token)
        const request: OrderRequest = {
            user_id: user_id,
            product_id: product_id,
            via: via,
            jumlah: jumlah,
            status: "UNPAID"
        }

        const check_stock = await productStock(product_id, jumlah)
        if (check_stock !== "1") {
            return res.status(400).json({
                code: 400,
                msg: check_stock
            })
        }

        if (via === "ACCOUNT") {
            const check = await checkUserBalance(user_email, request)
            if (check !== "1") {
                return res.status(400).json({
                    code: 400,
                    msg: check
                })
            }
        }

        const response = await orderRegister(request)

        if (via === "ACCOUNT") {
            const verify = await orderWithAmount(user_email, response, request)
            return res.status(201).json({
                code: 201,
                msg: 'success create order',
                data: {
                    product_name: response.product_name,
                    product_price: response.price,
                    quantity: response.quantity,
                    total: response.nominal,
                    checkout_url: '-',
                    status: verify
                },
            })
        } else {
            const { checkout_url, status } = await requestTransaction(response, user_email)
            return res.status(201).json({
                code: 201,
                msg: 'success create order',
                data: {
                    product_name: response.product_name,
                    product_price: response.price,
                    quantity: response.quantity,
                    total: response.nominal,
                    checkout_url: checkout_url,
                    status: status
                },
            })
        }
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
        if (!data || data.length === 0) {
            return res.status(200).json({
                code: 200,
                msg: 'Maaf kamu belum order sama sekali'
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

export const handlerOrderCancel = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    const token = req.headers.authorization as string
    try {
        const email = readEmail(token)
        const verify = await orderCancel(id, email)
        if (!verify) {
            return res.status(400).json({
                code: 400,
                msg: 'something weird'
            })
        }
        
        return res.status(200).json({
            code: 200,
            msg: 'success canceling order'
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}