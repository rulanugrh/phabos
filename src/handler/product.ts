import { Response, Request } from "express"
import { ProductRegister, ProductUpdate } from "../typed/dto"
import { productDelete, productGetAll, productGetByID, productRegister, productUpdate, productByName, productCount } from "../service/product"


export const handlerProductRegister = async(req: Request, res: Response): Promise<Response> => {
    const { name, process, price, description, category, stock } = req.body
    try {
        const request: ProductRegister = {
            name: name,
            description: description,
            price: price,
            process: process,
            category: category,
            stock: stock
        }

        const data = await productRegister(request)
        return res.status(201).json({
            code: 201,
            msg: 'success create product',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerProductGetByID = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    try {
        const data = await productGetByID(id)
        if (data.id === undefined) {
            return res.status(404).json({
                code: 404,
                msg: 'product not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success find product',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })    
    }
}

export const handlerProductGetAll = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await productGetAll()
        if (data === null || data === undefined) {
            return res.status(404).json({
                code: 404,
                msg: 'data not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get all product',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerProductUpdate = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    try {
        const request: ProductUpdate = {
            name: req.body?.name,
            price: req.body?.price,
            description: req.body?.description,
            category: req.body?.category,
            process: req.body?.process
        }

        const data = await productUpdate(id, request)
        if (data === null || data === undefined) {
            return res.status(500).json({
                msg: 'problem while updating data',
                code: 500
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success update product',
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerProductDelete = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    try {
        const _data = await productDelete(id)

        return res.status(200).json({
            code: 200,
            msg: 'success deleted product'
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerProductGetByName = async(req: Request, res: Response): Promise<Response> => {
    const name = req.query.name as string
    const category = req.query.category as string
    try {
        const data = await productByName(name, category)
        if (data === null || data === undefined) {
            return res.status(404).json({
                code: 404,
                msg: 'data not found'
            })
        }

        return res.status(200).json({
            code: 200,
            msg: 'success get all product',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}

export const handlerProductCount = async(req: Request, res: Response): Promise<Response> => {
    try {
        const data = await productCount()
        return res.status(200).json({
            code: 200,
            msg: 'success count product',
            total_product: data
        })
    } catch (error) {
        return res.status(400).json({
            msg: String(error),
            code: 400
        })
    }
}