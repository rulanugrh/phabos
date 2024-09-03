import { Request, Response } from "express";
import { readEmail, readID } from "../middleware/jwt";
import { OrderRequest, SendProduct } from '../typed/dto';
import { orderCancel, orderCountingPemasukanHariIni, orderCountingPemasukanTotal, orderList, orderRegister, orderWithAmount, orderUpdateCheckoutURL, orderGetAllForAdmin, orderUpdateForAccept, orderDelete, sendProduct, orderGetByID, orderCountingBonus } from "../service/order";
import { requestTransaction } from "../util/tripay";
import { checkUserBalance, userGetPhoneNumber } from "../service/user";
import { productStock } from '../service/product';

export const handlerOrderRegister = async(req: Request, res: Response): Promise<Response> => {
    const { product_id, via, jumlah } = req.body
    const token = req.headers.authorization as string

    try {
        const user_id = readID(token)
        const user_email = readEmail(token)
        const phone_number = await userGetPhoneNumber(user_email)
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
            await orderUpdateCheckoutURL(response.id, '-')
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
            const { checkout_url, status } = await requestTransaction(response, user_email, phone_number)
            if (!checkout_url)  {
                await orderDelete(response.id)
                return res.status(504).json({
                    code: 504,
                    msg: 'Sorry the payment system is having problems. Please re-request again'
                })
            }
            await orderUpdateCheckoutURL(response.id, checkout_url)
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
                msg: 'sorry no income',
                total_income: 0
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'income today',
            total_income: data
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
                msg: 'sorry no income today',
                total_income: 0
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'income total',
            total_income: data
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

export const handlerOrderGetAllForAdmin = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await orderGetAllForAdmin()
        if (!data || data.length === 0) {
            return res.status(200).json({
                code: 200,
                msg: 'Maaf belum ada order sama sekali'
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

export const handlerOrderUpdateAccept = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    try {
        await orderUpdateForAccept(id)
        return res.status(200).json({
            code: 200,
            msg: 'success update status accept for this id'
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerOrderSendProduct = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    const { account, password, expired, rules } = req.body
    try {
        const request: SendProduct = {
            account: account,
            password: password,
            expired: expired,
            rules: rules
        }

        const data = await sendProduct(id, request)
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: 'Sorry id order not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success send product'
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerOrderFindByID = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    try {
        const data = await orderGetByID(id)
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: 'sorry order with this id not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get order',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerOrderBonus = async(req: Request, res: Response): Promise<Response> => {
    const amount = req.query.amount
    try {
        const total = await orderCountingBonus(Number(amount))
        return res.status(200).json({
            code: 200,
            msg: 'success count bonus',
            data: total
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}