import { Response, Request } from 'express';
import crypto from "crypto"
import { firestore } from '../config/firebase';

export const callbackTripay = async(req: Request, res: Response): Promise<Response> => {
    try {
        let json = req.body
        let signature = crypto.createHmac('sha256', process.env.API_PRIVATE_KEY as string)
            .update(JSON.stringify(json))
            .digest('hex');

        console.log(signature)
        console.log(json)

        const get_order = (await firestore.collection('orders').doc(json['merchant_ref']).get()).data()
        const get_product = (await firestore.collection('products').doc(get_order?.product_id).get()).data()

        if (json['status'] === 'PAID') {
            const _update_order = await firestore.collection('orders').doc(json['merchant_ref']).update({
                status: 'Preprocessing'
            })
            const _update_product = await firestore.collection('products').doc(get_order?.product_id).update({
                stock: get_product?.stock - get_order?.jumlah
            })
        } else if (json['status'] === 'EXPIRED') {
            const _update_order = await firestore.collection('orders').doc(json['merchant_ref']).update({
                status: 'EXPIRED'
            })
        } else if (json['status'] === 'FAILED') {
            const _update_order = await firestore.collection('orders').doc(json['merchant_ref']).update({
                status: 'FAILED'
            })
        } else {
            const _update_order = await firestore.collection('orders').doc(json['merchant_ref']).update({
                status: 'PENDING'
            })
        }

        return res.status(200).json({
            code: 200,
            data: json
        })
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: String(error)
        })
    }
}