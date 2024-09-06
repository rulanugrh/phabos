import { Response, Request } from 'express';
import crypto from "crypto"
import { firestore } from '../config/firebase';
import dotenv from "dotenv"
dotenv.config()

export const callbackTripay = async(req: Request, res: Response): Promise<Response> => {
    try {
        const json = req.body
        const signature = crypto.createHmac('sha256', process.env.TRIPAY_API_PRIVATE_KEY as string)
            .update(JSON.stringify(json))
            .digest('hex');

        console.log(signature, json)
        
        if (json.merchant_ref !== null) {
            const get_topup = (await firestore.collection('topups').doc(json['merchant_ref']).get()).data()
            const get_user = await (await firestore.collection('users').doc(get_topup?.user_email).get()).data()
            if (get_topup?.status !== "PAID") {
                if (json.status === "PAID") {
                    const bonus = json.amount_received === 100000 || json.amount_received === 300000 ? json.amount_received * 0.05 : 0;
                    const _update_topup = await firestore.collection('users').doc(get_topup?.user_email).update({
                        amount: get_user?.amount + json.amount_received + Number(bonus)
                    })
                    
                    const _update_topups = await firestore.collection('topups').doc(json['merchant_ref']).update({
                        status: 'PAID'
                    })
                } else if (json.status === "EXPIRED") {
                    const _update_topups = await firestore.collection('topups').doc(json['merchant_ref']).update({
                        status: 'EXPIRED'
                    })
                } else if (json.status === "FAILED") {
                    const _update_topups = await firestore.collection('topups').doc(json['merchant_ref']).update({
                        status: 'FAILED'
                    })
                }

            } else {
                console.log("Success Update status")
            }

        }
        return res.status(200).json({
            code: 200,
            msg: 'success request to callback url'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            code: 400,
            msg: String(error)
        })
    }
}