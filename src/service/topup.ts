import { firestore } from "../config/firebase";
import { ResponseGetTopup, ResponseTopup } from "../typed/dao";
import { TopUp } from "../typed/dto";
import { v4 as uuid } from 'uuid';
import { FirebaseFirestoreError } from "firebase-admin/firestore";

export const topupRegister = async(req: TopUp): Promise<ResponseTopup> => {
    try {
        const data = {
            user_email: req.user_email,
            via: req.via,
            balance: req.balance,
            status: 'UNPAID',
            tanggal: new Date().toDateString()
        }

        const res = await firestore.collection('topups').doc(uuid())
        const _apply = await res.set(data)
        const response = (await firestore.collection('topups').doc(res.id).get()).data()

        const result: ResponseTopup = {
            id: res.id,
            user_email: response?.user_email,
            via: response?.via,
            balance: response?.balance,
            status: response?.status,
            tanggal: response?.tanggal
        }

        return result
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }
        console.log(error)
        throw new Error('Internal Server Error')
    }
}

export const topupHistory = async(user_email: string): Promise<ResponseGetTopup[]> => {
    try {
        const snapshot = await firestore.collection('topups').where('user_email', '==', user_email).get()
        const result = snapshot.docs.map((doc) => {
            const dt = doc.data()
            const result: ResponseGetTopup = {
                id: doc.id,
                via: dt?.via,
                balance: dt?.balance,
                status: dt?.status,
                tanggal: dt?.tanggal
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

export const topupDetail = async(id: string): Promise<ResponseGetTopup> => {
    try {
        const data = (await firestore.collection('topups').doc(id).get()).data()
        const result: ResponseGetTopup = {
            id: id,
            via: data?.via,
            balance: data?.balance,
            tanggal: data?.tanggal,
            status: data?.status
        }

        return result
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        throw new Error('Internal Server Error')
    }
}

export const topupGetAllByAdmin = async(): Promise<ResponseTopup[]> => {
    try {
        const snapshot = await firestore.collection('topups').get()
        const result = snapshot.docs.map((doc) => {
            const dt = doc.data()
            const result: ResponseTopup = {
                id: doc.id,
                via: dt?.via,
                balance: dt?.balance,
                status: dt?.status,
                tanggal: dt?.tanggal,
                user_email: dt?.user_email
            }

            return result
        })

        return result
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        console.log(error)
        throw new Error('Internal Server Error')
    }
}

export const topupDelete = async(id: string): Promise<any> => {
    try {
        return await firestore.collection('topups').doc(id).delete()
    } catch (error) {
        if (error instanceof FirebaseFirestoreError) {
            throw new Error(error.message)
        }

        console.log(error)
        throw new Error('Internal Server Error')  
    }
}