import { ResponseTopup } from "../typed/dao";
import axios, { AxiosError } from "axios";
import crypto from "crypto"
import { firestore } from "../config/firebase";
import dotenv from "dotenv"
dotenv.config()

export const requestTransactionTopup = async(request: ResponseTopup, user_email: string, phone_number: string): Promise<{checkout_url: string, status: string}> => {
    try {
        const userData = (await firestore.collection('users').doc(user_email).get()).data()
        const expiry = Math.floor(Date.now() / 1000)

        let signature = crypto.createHmac('sha256', process.env.TRIPAY_API_PRIVATE_KEY as string).update(
            process.env.TRIPAY_MERCHANT_CODE as string + request.id + request.balance
        ).digest('hex')

        const payload = {
            'method': request.via,
            'merchant_ref': request.id,
            'amount': request.balance,
            'customer_name': userData?.name as string,
            'customer_email': user_email,
            'customer_phone': phone_number,
            'order_items': [
                {
                    'name': 'TopUp',
                    'price': request.balance,
                    'quantity': 1,
                }
            ],
            'callback_url': process.env.TRIPAY_URL_CALLBACK as string,
            'expired_time': expiry,
            'signature': signature,
        }

        const response = await axios.post(process.env.TRIPAY_URL_ENDPOINT as string, payload, {
            headers: {
                'Authorization': 'Bearer ' + process.env.TRIPAY_API_KEY,
            },
            validateStatus: function(status) {
                return status < 999
            }
        })

        console.log(response)
        const checkout_url = response.data.data.checkout_url
        const status = response.data.data.status
        return { checkout_url, status }
    } catch (error) {
        console.log(error)
        if ( error instanceof AxiosError) {
            throw new Error(error.message)
        }

        throw new Error('Sorry something error on your request to Tripay')
    }
}