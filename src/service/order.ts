import { firestore } from "../config/firebase";
import { ListPembelian, ResponseCreateOrder } from "../typed/dao";
import { OrderRequest } from "../typed/dto";
import { FirebaseFirestoreError } from "firebase-admin/firestore";
import { v4 as uuid } from 'uuid';

export const orderRegister = async(req: OrderRequest): Promise<ResponseCreateOrder> => {
    try {
        const product = (await firestore.collection("products").doc(req.product_id).get()).data()
        const data = {
            user_id: req.user_id,
            jumlah: req.jumlah,
            product_name: product?.name,
            product_category: product?.category,
            product_price: product?.price,
            status: req.status,
            total: product?.price * req.jumlah,
            tanggal_pesanan: new Date().toDateString(),
            via: req.via,
            product_id: req.product_id,
        }

        const _order = await firestore.collection('orders').doc(uuid())
        const _set = _order.set(data)
        const result = (await firestore.collection('orders').doc(_order.id).get()).data()

        const response: ResponseCreateOrder = {
            id: _order.id,
            category: result?.category,
            price: result?.product_price,
            status: result?.status,
            via: result?.via,
            tanggal: result?.tanggal_pemesanan,
            process: result?.process,
            nominal: result?.total,
            product_name: result?.product_name,
            quantity: result?.jumlah
        }

        return response
    } catch (error) {
        console.log(error)
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const orderList = async(id: string): Promise<ListPembelian[]> => {
    try {
        const snapshot = await firestore.collection('orders').where("user_id", "==", id).get()
        const result = snapshot.docs.map((doc) => {
            const dt = doc.data()
            const result: ListPembelian = {
                id: doc.id,
                product_name: dt.product_name,
                category: dt.product_category,
                via: dt.via,
                status: dt.status,
                total: dt.total,
                tanggal: dt.tanggal_pesanan,
                process: dt.process
            }

            return result
        })

        return result
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const orderCountingPemasukanHariIni = async(): Promise<number> => {
    try {
        let num = 0
        const snapshot = await firestore.collection('orders').where("status", "==", "accept").where("tanggal_pesanan", "==", new Date().toDateString()).get()
        const _result = snapshot.docs.map((doc) => {
            const dt = doc.data()
            num += dt?.total as number
        })

        return num
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const orderCountingPemasukanTotal = async(): Promise<number> => {
    try {
        let num = 0
        const snapshot = await firestore.collection('orders').where("status", "==", "accept").get()
        const _result = snapshot.docs.map((doc) => {
            const dt = doc.data()
            num += dt?.total as number
        })

        return num
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const orderCancel = async(id: string, user_email: string): Promise<boolean> => {
    try {
        const data = await firestore.collection('orders').doc(id)
        const get_data_order = (await data.get()).data()
        const get_data_product = (await firestore.collection('products').doc(get_data_order?.product_id).get()).data()
        const _update_data_product = await firestore.collection('products').doc(get_data_order?.product_id).update({
            stock: get_data_product?.stock + get_data_order?.jumlah
        })
        const _deleted = data.delete()

        const get_user_data = (await firestore.collection('users').doc(user_email).get()).data()
        const _update_amount = await firestore.collection('users').doc(user_email).update({
            amount: get_user_data?.amount + get_data_order?.total
        })

        return true
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        console.log(error)
        throw new Error('Internal Server Error')
    }
}

export const orderWithAmount = async(email: string, res: ResponseCreateOrder, req: OrderRequest): Promise<string> => {
    try {
        const get_user_data = (await firestore.collection('users').doc(email).get()).data()
        const _update = await firestore.collection('users').doc(email).update({
            amount: get_user_data?.amount - res.nominal
        })

        const _update_status = await firestore.collection('orders').doc(res.id).update({
            status: 'Preprocessing'
        })
        const get_product_data = (await firestore.collection('products').doc(req.product_id).get()).data()
        const _update_stock = await firestore.collection('products').doc(req.product_id).update({
            stock: get_product_data?.stock - req.jumlah
        })

        const get_order = (await firestore.collection('orders').doc(res.id).get()).data()

        return get_order?.status as string
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        console.log(error)
        throw new Error('Internal Server Error')
    }
}